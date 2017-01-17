from functools import wraps
from django.db.models import ForeignKey
from json import loads as from_json
from rest_framework.serializers import Field
from django_filters import BaseInFilter, NumberFilter


class NumericInFilter(BaseInFilter, NumberFilter):
    pass


class resolve_foreign_keys(object):
    def __init__(self, class_object):
        self.class_meta = class_object._meta
        self.fields = [field.name for field in self.class_meta.get_fields() if isinstance(field, ForeignKey)]

    def __call__(self, fn):
        @wraps(fn)
        def wrapper(context, request, *args, **kwargs):
            for field_name in self.fields:
                data = request.data[field_name]
                if isinstance(data, str):
                    data = from_json(data)
                request.data[field_name] = self.class_meta.get_field(field_name).rel.to.objects.get(pk=data['id'])
            return fn(context, request, *args, **kwargs)
        return wrapper


def to_dict(qd):
    if isinstance(qd, dict):
        return qd
    return {k: v[0] if len(v) == 1 else v for k, v in qd.lists()}


class resolve_enum_fields(object):
    def __init__(self, *config):
        self.config = config

    def __call__(self, fn):
        @wraps(fn)
        def wrapper(context, request, *args, **kwargs):
            if hasattr(request.data, '_mutable'):
                request.data._mutable = True

            if hasattr(request.query_params, '_mutable'):
                request.query_params._mutable = True

            for name, values in self.config:
                if name in request.data:
                    request.data[name] = values.index(request.data[name])
                if name in request.query_params:
                    request.query_params[name] = values.index(request.query_params[name])

            return fn(context, request, *args, **kwargs)
        return wrapper


def resolve_user_profile(fn):
    from .models import Profile

    @wraps(fn)
    def wrapper(self, request, *args, **kwargs):
        kwargs['user_profile'] = Profile.objects.get(user=request.user)
        return fn(self, request, *args, **kwargs)
    return wrapper


def fill_kwargs(fn):
    @wraps(fn)
    def wrapper(self, request, *args, **kwargs):
        data = request.query_params if request.method in ('GET',) else request.data
        kwargs.update(to_dict(data))
        return fn(self, request, *args, **kwargs)

    return wrapper


class EnumField(Field):
    def __init__(self, values, *args, **kwargs):
        self.values = values
        Field.__init__(self, *args, **kwargs)

    def to_representation(self, value):
        if type(value) is list:
            return [self.values[i] for i in value]
        else:
            return self.values[value]

    def to_internal_value(self, data):
        if type(data) is list:
            return [self.values.index(v) for v in data]
        else:
            return self.values.index(data)

