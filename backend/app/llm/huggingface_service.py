from transformers import AutoModelForCausalLM, AutoTokenizer

from app.llm.service import LLMService


MODEL_NAME = "Qwen/Qwen2.5-0.5B-Instruct"


class HuggingFaceLLMService(LLMService):
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        self.model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

    def generate(self, prompt: str) -> str:
        if not prompt or not prompt.strip():
            raise ValueError("Prompt cannot be empty")

        messages = [
            {
                "role": "user",
                "content": prompt,
            }
        ]

        inputs = self.tokenizer.apply_chat_template(
            messages,
            add_generation_prompt=True,
            tokenize=True,
            return_dict=True,
            return_tensors="pt",
        )

        outputs = self.model.generate(
            **inputs,
            max_new_tokens=128,
            do_sample=False,
            pad_token_id=self.tokenizer.eos_token_id,
        )

        generated_tokens = outputs[0][inputs["input_ids"].shape[-1]:]

        return self.tokenizer.decode(
            generated_tokens,
            skip_special_tokens=True,
        ).strip()