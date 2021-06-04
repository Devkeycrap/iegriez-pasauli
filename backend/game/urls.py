from rest_framework import routers
from .views import GameItemViewSet, MapAnswerValidationViewSet, MapQuestionViewSet, QuizAnswerViewSet, QuizQuestionViewSet


router = routers.DefaultRouter()

router.register(r'api/gameItems', GameItemViewSet, 'game_items')
router.register(
    r'api/quiz/questions',
    QuizQuestionViewSet, 'quiz_question'
)
router.register(r'api/quiz/answers', QuizAnswerViewSet, 'quiz_answer')
router.register(r'api/map/questions', MapQuestionViewSet, 'map_questions')
router.register(r'api/map/answers', MapAnswerValidationViewSet, 'map_answers')

urlpatterns = router.urls
