from groq import Groq
import json
from io import StringIO

client = Groq(api_key="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")

def generate_ai_summary_groq(metrics: list[dict]) -> str:
    # Convert metrics to a clean JSON string for readability
    metric_text = json.dumps(metrics, indent=2)

    prompt = (
        "You are a system performance assistant.\n"
        "Given the following server load metrics in JSON format, provide a concise summary "
        "about the system load behavior and any anomalies or trends.\n\n"
        f"{metric_text}"
    )

    try:
        completion = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_completion_tokens=512,
            top_p=1,
            stream=True,
            stop=None,
        )

        # Collect streamed content
        output = StringIO()
        for chunk in completion:
            output.write(chunk.choices[0].delta.content or "")
        
        return output.getvalue().strip()

    except Exception as e:
        return f"Error generating AI summary: {str(e)}"
