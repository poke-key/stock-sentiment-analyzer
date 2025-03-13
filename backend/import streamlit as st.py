import streamlit as st
import pickle
import numpy as np

# Load trained models (ensure these are pre-saved after training)
with open("models.pkl", "rb") as f:
    models = pickle.load(f)

# Mapping of categories to stock targets
category_targets = {
    1: ["NVDA_Change", "INTC_Change"],
    2: ["MSFT_Change", "AMZN_Change", "GOOGL_Change"],
    3: ["TSLA_Change", "META_Change"],
    4: ["CRWD_Change", "PANW_Change"],
}

# Streamlit UI
st.title("Stock Price Change Predictor")
st.write("Enter sentiment and polarity scores to predict stock price changes.")

# User Inputs
category = st.selectbox("Select Category", [1, 2, 3, 4])
polarity = st.number_input("Enter Polarity Score", min_value=-1.0, max_value=1.0, step=0.01)
sentiment = st.number_input("Enter Sentiment Score", min_value=-1.0, max_value=1.0, step=0.01)

# Prediction
if st.button("Predict"):
    model_results = models.get(category, {})
    input_features = np.array([[polarity, sentiment]])
    
    predictions = {}
    for stock, model_info in model_results.items():
        if model_info["Model"]:
            pred = model_info["Model"].predict(input_features)[0]
            predictions[stock] = round(pred, 2)
        else:
            predictions[stock] = "Model not available"
    
    st.write("### Predicted Stock Price Changes:")
    st.json(predictions)
