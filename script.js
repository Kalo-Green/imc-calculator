"use strict";

const BMI_UNDERWEIGHT_MAX = 18.5;
const BMI_NORMAL_MAX = 25;
const BMI_OVERWEIGHT_MAX = 30;
const BMI_OBESITY_MODERATE_MAX = 35;
const BMI_OBESITY_SEVERE_MAX = 40;
const ZONE_SIZE = 100 / 6;

function calculateBMI() {
    
    const weight = parseFloat(document.getElementById("weight").value);
    const heightCm = parseFloat(document.getElementById("height").value);

    // Vérification des données : doit être un nombre et positif
    if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
        document.getElementById("error-message").textContent = "⚠️ Données invalides";
        return;
    }

    // Supprime le message d'erreur si les données sont valides
    document.getElementById("error-message").textContent = "";

    const heightM = heightCm / 100;
    const BMI = weight / (heightM * heightM);

    // Met à jour la jauge en fonction de l'IMC
    updateGauge(BMI);

    // Détermine la catégorie IMC et la couleur associée
    let category = "";
    let color = "";

    if (BMI < BMI_UNDERWEIGHT_MAX) {
        category = "Maigreur";
        color = "#3b82f6";
    } else if (BMI < BMI_NORMAL_MAX) {
        category = "Poids normal";
        color = "#22c55e";
    } else if (BMI < BMI_OVERWEIGHT_MAX) {
        category = "Surpoids";
        color = "#eab308";
    } else if (BMI < BMI_OBESITY_MODERATE_MAX) {
        category = "Obésité modérée";
        color = "#f59e0b";
    } else if (BMI < BMI_OBESITY_SEVERE_MAX) {
        category = "Obésité sévère";
        color = "#ef4444";
    } else {
        category = "Obésité très sévère";
        color = "#b91c1c";
    }

    // Affiche l'IMC, la catégorie et applique la couleur correspondante
    document.getElementById("bmi-result").textContent =
        `Votre IMC est de ${BMI.toFixed(1)}`;

    document.getElementById("category-result").textContent =
        `Catégorie : ${category}`;

    document.getElementById("bmi-result").style.color = color;
    document.getElementById("category-result").style.color = color;
}

/*
Calcul de la position de l’IMC sur la jauge

On transforme l’IMC en pourcentage (0% → 100%) selon sa zone.

Principe :
- on trouve dans quelle tranche d’IMC on est (entre deux limites)
- on calcule la progression dans cette tranche
(IMC - début de zone) / (fin de zone - début de zone)
- on convertit cette progression en % de la zone
- on ajoute les zones précédentes pour obtenir la position totale
*/
function updateGauge(bmi) {

    const indicator = document.getElementById("indicator");

    let percent = 100;

    // Zone 1 : Maigreur (0 -> BMI_UNDERWEIGHT_MAX)
    if (bmi < BMI_UNDERWEIGHT_MAX) {
        percent = (bmi / BMI_UNDERWEIGHT_MAX) * ZONE_SIZE;
    }

    // Zone 2 : Poids normal (BMI_UNDERWEIGHT_MAX -> BMI_NORMAL_MAX)
    else if (bmi < BMI_NORMAL_MAX) {
        percent = ZONE_SIZE +
            ((bmi - BMI_UNDERWEIGHT_MAX) / (BMI_NORMAL_MAX - BMI_UNDERWEIGHT_MAX)) * ZONE_SIZE;
    }

    // Zone 3 : Surpoids (BMI_NORMAL_MAX -> BMI_OVERWEIGHT_MAX)
    else if (bmi < BMI_OVERWEIGHT_MAX) {
        percent = 2 * ZONE_SIZE +
            ((bmi - BMI_NORMAL_MAX) / (BMI_OVERWEIGHT_MAX - BMI_NORMAL_MAX)) * ZONE_SIZE;
    }

    // Zone 4 : Obésité modérée (BMI_OVERWEIGHT_MAX -> BMI_OBESITY_MODERATE_MAX)
    else if (bmi < BMI_OBESITY_MODERATE_MAX) {
        percent = 3 * ZONE_SIZE +
            ((bmi - BMI_OVERWEIGHT_MAX) / (BMI_OBESITY_MODERATE_MAX - BMI_OVERWEIGHT_MAX)) * ZONE_SIZE;
    }

    // Zone 5 : Obésité sévère (BMI_OBESITY_MODERATE_MAX -> BMI_OBESITY_SEVERE_MAX)
    else if (bmi < BMI_OBESITY_SEVERE_MAX) {
        percent = 4 * ZONE_SIZE +
            ((bmi - BMI_OBESITY_MODERATE_MAX) / (BMI_OBESITY_SEVERE_MAX - BMI_OBESITY_MODERATE_MAX)) * ZONE_SIZE;
    }

    // Zone 6 : Obésité très sévère (> IMC_MAX_OBESITE_SEVERE)
    else {
        // Progression au-delà de la dernière zone
        const progress = (bmi - BMI_OBESITY_SEVERE_MAX) / 10;

        percent = 5 * ZONE_SIZE + progress * ZONE_SIZE;

        // Limite maximale à 100%
        if (percent > 100) {
            percent = 100;
        }
    }

    // Déplace l’indicateur sur la jauge selon le pourcentage calculé
    indicator.style.left = percent + "%";
}

// Lance le calcul au clic sur le bouton
document.getElementById("calculate-btn").addEventListener("click", calculateBMI);