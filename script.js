// ডেমো CSV ডেটা
const demoCSV = `
Product,Consumer Type,Location,Season
ধান,দরিদ্র,গ্রাম,গ্রীষ্ম
ডায়মন্ড,ধনী,শহর,শীত
শীতকালীন স্পেশাল প্রোডাক্ট,ধনী,শহর,শীত
ধান,মধ্যবিত্ত,শহর,গ্রীষ্ম
ডায়মন্ড,ধনী,শহর,গ্রীষ্ম
শীতকালীন স্পেশাল প্রোডাক্ট,মধ্যবিত্ত,গ্রাম,শীত
`;

// ডেমো CSV ডেটা প্রদর্শন করার ফাংশন
function displayDemoCSV() {
    // ডেমো CSV ডেটা পৃষ্ঠায় প্রদর্শন করা
    document.getElementById('demoCSVContent').textContent = demoCSV;
}

// আপলোড করা বা ডেমো CSV ডেটা প্রসেস করার ফাংশন
function processCSV() {
    var fileInput = document.getElementById('csvFile');
    var file = fileInput.files[0];
    
    if (file) {
        // যদি একটি ফাইল আপলোড করা হয়, তাহলে ফাইল প্রসেস করুন
        Papa.parse(file, {
            complete: function(results) {
                // যদি হেডার ভুল হয়
                if (!results.data || results.data.length === 0 || !results.meta.fields.includes("Product") || !results.meta.fields.includes("Consumer Type") || !results.meta.fields.includes("Location") || !results.meta.fields.includes("Season")) {
                    document.getElementById('predictionResult').innerHTML = "ভুল CSV ফাইল ফরম্যাট। নিশ্চিত করুন যে ফাইলটির মধ্যে 'Product', 'Consumer Type', 'Location' এবং 'Season' কলাম আছে।";
                    return;
                }
                // ডেটা প্রসেস করুন পূর্বাভাসের জন্য
                let predictionResults = makePrediction(results.data);

                // পূর্বাভাস ফলাফল দেখান
                document.getElementById('predictionResult').innerHTML = predictionResults;
            },
            header: true,  // প্রথম সারিটি হেডার মনে করা হয়েছে
        });
    } else {
        // যদি কোনো ফাইল আপলোড না করা হয়, ডেমো CSV ডেটা প্রসেস করুন
        Papa.parse(demoCSV, {
            complete: function(results) {
                // ডেমো ডেটা প্রসেস করুন পূর্বাভাসের জন্য
                let predictionResults = makePrediction(results.data);

                // পূর্বাভাস ফলাফল দেখান
                document.getElementById('predictionResult').innerHTML = predictionResults;
            },
            header: true,  // প্রথম সারিটি হেডার মনে করা হয়েছে
        });
    }
}

// ডেমো ডেটা প্রসেস করার ফাংশন
function processDemoData() {
    let demoPredictionResults = `
ধান, গ্রীষ্মকালে গ্রামে দরিদ্র মানুষদের দ্বারা কেনা হবে।
ডায়মন্ড, শীতকালে শহরে ধনী মানুষদের দ্বারা কেনা হবে।
শীতকালীন স্পেশাল প্রোডাক্ট, শীতকালে শহরে ধনী মানুষদের দ্বারা কেনা হবে।
ধান, গ্রীষ্মকালে শহরে মধ্যবিত্ত মানুষদের দ্বারা কেনা হবে।
ডায়মন্ড, গ্রীষ্মকালে শহরে ধনী মানুষদের দ্বারা কেনা হবে।
শীতকালীন স্পেশাল প্রোডাক্ট, শীতকালে গ্রামে মধ্যবিত্ত মানুষদের দ্বারা কেনা হবে।
    `;

    // প্রসেসড ডেমো ডেটা ফলাফল প্রদর্শন করুন (light color style)
    let demoResultBox = document.getElementById('processedData');
    demoResultBox.textContent = demoPredictionResults;
    demoResultBox.classList.add('demo-result-box');
}

// CSV ডেটা থেকে পূর্বাভাস তৈরি করার ফাংশন
function makePrediction(data) {
    let predictionMessage = "";

    // CSV ডেটার প্রতিটি রো প্রক্রিয়া করা
    data.forEach(row => {
        let product = row['Product'];
        let consumerType = row['Consumer Type'];
        let location = row['Location'];
        let season = row['Season'];

        // যদি কোন ডেটা অনুপস্থিত থাকে
        if (!product || !consumerType || !location || !season) {
            predictionMessage += `ডেটা অসম্পূর্ণ: পণ্য: ${product || "N/A"}, ভোক্তা টাইপ: ${consumerType || "N/A"}, লোকেশন: ${location || "N/A"}, বা সিজন: ${season || "N/A"}. অনুগ্রহ করে ডেটা পরীক্ষা করুন।<br>`;
        } else {
            // পণ্য, ভোক্তা টাইপ, লোকেশন, এবং সিজনের উপর ভিত্তি করে পূর্বাভাস তৈরি করা
            if (product === "ধান" && consumerType === "দরিদ্র" && location === "গ্রাম" && season === "গ্রীষ্ম") {
                predictionMessage += `ধান, গ্রীষ্মকালে গ্রামে দরিদ্র মানুষদের দ্বারা কেনা হবে।<br>`;
            } else if (product === "ডায়মন্ড" && consumerType === "ধনী" && location === "শহর" && season === "শীত") {
                predictionMessage += `ডায়মন্ড, শীতকালে শহরে ধনী মানুষদের দ্বারা কেনা হবে।<br>`;
            } else if (product === "শীতকালীন স্পেশাল প্রোডাক্ট" && consumerType === "ধনী" && location === "শহর" && season === "শীত") {
                predictionMessage += `শীতকালীন স্পেশাল প্রোডাক্ট, শীতকালে শহরে ধনী মানুষদের দ্বারা কেনা হবে।<br>`;
            } else if (product === "ধান" && consumerType === "মধ্যবিত্ত" && location === "শহর" && season === "গ্রীষ্ম") {
                predictionMessage += `ধান, গ্রীষ্মকালে শহরে মধ্যবিত্ত মানুষদের দ্বারা কেনা হবে।<br>`;
            } else if (product === "ডায়মন্ড" && consumerType === "ধনী" && location === "শহর" && season === "গ্রীষ্ম") {
                predictionMessage += `ডায়মন্ড, গ্রীষ্মকালে শহরে ধনী মানুষদের দ্বারা কেনা হবে।<br>`;
            } else if (product === "শীতকালীন স্পেশাল প্রোডাক্ট" && consumerType === "মধ্যবিত্ত" && location === "গ্রাম" && season === "শীত") {
                predictionMessage += `শীতকালীন স্পেশাল প্রোডাক্ট, শীতকালে গ্রামে মধ্যবিত্ত মানুষদের দ্বারা কেনা হবে।<br>`;
            } else {
                predictionMessage += `${product} এর জন্য স্পষ্ট পূর্বাভাস পাওয়া যায়নি।<br>`;
            }
        }
    });

    return predictionMessage;
}
