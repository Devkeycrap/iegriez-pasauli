from rest_framework import routers
from .views import GameItemViewSet, MapAnswerValidationViewSet, MapQuestionViewSet, QuizAnswerValidationViewSet, QuizQuestionViewSet


router = routers.DefaultRouter()

# Game urls
router.register(r'api/gameItems', GameItemViewSet, 'game_items')

# Quiz urls
router.register(
    r'api/quiz/questions',
    QuizQuestionViewSet, 'quiz_question'
)
router.register(r'api/quiz/answers',
                QuizAnswerValidationViewSet, 'quiz_answer')

# Map urls
router.register(r'api/map/questions', MapQuestionViewSet, 'map_questions')
router.register(r'api/map/answers', MapAnswerValidationViewSet, 'map_answers')

urlpatterns = router.urls
