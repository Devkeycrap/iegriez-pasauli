from rest_framework import routers

from .views import UsersViewSet

router = routers.DefaultRouter()
router.register(r'api/users', UsersViewSet, 'users')

urlpatterns = router.urls
