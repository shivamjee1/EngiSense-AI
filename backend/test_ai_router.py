from app.ai.router import AIToolRouter


router = AIToolRouter()

questions = [
    "Give me a summary of this dataset.",
    "What are the average and standard deviation of the parameters?",
    "Which parameters are correlated?",
    "Which values are abnormal?",
]


for question in questions:
    print("\nQUESTION:")
    print(question)

    tool = router.select_tool(question)

    print("SELECTED TOOL:")
    print(tool)