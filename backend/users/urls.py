from rest_framework import routers

from .views import UsersViewSet

router = routers.DefaultRouter()
router.register('api/users', UsersViewSet)

urlpatterns = router.urls
