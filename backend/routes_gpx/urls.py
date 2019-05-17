from django.urls import path

from .views import RouteList, RouteDetail

urlpatterns = [
    path('', RouteList.as_view()),
    path('<int:pk>', RouteDetail.as_view())
]