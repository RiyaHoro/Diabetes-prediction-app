import React from "react";
import aboutImage from "./assets/about.jpg"; // Ensure this path is correct

const AboutUs = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 to-teal-300" id="AboutUs">
      <div className="container px-6 mx-auto max-w-7xl md:px-12">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Text Side */}
          <div className="mb-8 md:w-1/2 md:mb-0 md:pr-10">
          <span class="inline-block px-4 py-1 mb-4 text-2xl font-sans font-bold text-blue-800 bg-blue-200 rounded-full">
              About Us
            </span>
            <p className="mb-6 text-xl leading-relaxed text-gray-800">
              Our mission is to provide accessible and reliable diabetes prediction tools that help individuals take control of their health. By offering personalized insights, we aim to empower users with information they can use to make informed decisions.
            </p>
            <p className="text-lg leading-relaxed text-gray-800">
              We use advanced machine learning models to predict the likelihood of developing diabetes based on user input. Our goal is to raise awareness and encourage proactive health management.
            </p>
          </div>

          {/* Image Side */}
          <div
            className="w-full h-64 bg-center bg-cover rounded-lg shadow-lg md:h-96"
            style={{ backgroundImage: `url(${aboutImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        </div>

        {/* Parameters Section */}
        <div className="max-w-4xl px-6 py-10 mx-auto mt-10 text-gray-800 shadow-md rounded-lg shadow-lg bg-blue-50">
          <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">Prediction Parameters</h1>
          <p className="mb-6">Here’s a breakdown of the medical parameters used in our prediction model:</p>

          <div className="grid gap-6 md:grid-cols-2">
            {[ 
              {
                name: "Pregnancies",
                desc: "Number of times you’ve been pregnant (includes miscarriages and stillbirths)."
              },
              {
                name: "Glucose",
                desc: "Blood sugar level measured in mg/dL. Use a glucometer or lab test after fasting."
              },
              {
                name: "Blood Pressure",
                desc: "Diastolic blood pressure (lower number). Measured with a BP monitor."
              },
              {
                name: "Skin Thickness",
                desc: "Triceps skinfold thickness in mm. Requires calipers; typically measured by professionals."
              },
              {
                name: "Insulin",
                desc: "2-hour serum insulin level (mu U/ml). Measured via blood test after glucose intake."
              },
              {
                name: "BMI",
                desc: "Body Mass Index: weight (kg) / height² (m²)."
              },
              {
                name: "Diabetes Pedigree Function",
                desc: "Score reflecting family history of diabetes: 0 (none), 1 (strong history)."
              },
              {
                name: "Age",
                desc: "Your current age in years."
              }
            ].map((param, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg">
                <h3 className="font-semibold text-gray-800">{param.name}</h3>
                <p className="text-sm text-gray-600">{param.desc}</p>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default AboutUs;
