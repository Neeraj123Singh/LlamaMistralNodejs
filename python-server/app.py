import os
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM

app = Flask(__name__)

models = {
    "llama2": {
        "tokenizer": AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf", use_fast=True, token='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'),
        "model": AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf", token='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')
    },
    "mistral": {
        "tokenizer": AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.3", use_fast=True, token='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'),
        "model": AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.3", token='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')
    }
}

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    model_name = data['model']
    question = data['question']

    if model_name not in models:
        return jsonify({"error": "Model not found"}), 400

    tokenizer = models[model_name]["tokenizer"]
    model = models[model_name]["model"]

    inputs = tokenizer(question, return_tensors="pt")
    outputs = model.generate(inputs.input_ids)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
