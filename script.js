"use strict";

const IMC_MIN_MAIGREUR = 18.5;
const IMC_MAX_NORMAL = 25;
const IMC_MAX_SURPOIDS = 30;
const IMC_MAX_OBESITE_MODEREE = 35;
const IMC_MAX_OBESITE_SEVERE = 40;
const ZONE_SIZE = 100/6;

function calculerIMC() {

    const poids = parseFloat(document.getElementById("poids").value);
    const tailleCm = parseFloat(document.getElementById("taille").value);

    // Vérification des données : doit être un nombre et positif
    if (isNaN(poids) || isNaN(tailleCm) || poids <= 0 || tailleCm <= 0) {
        document.getElementById("error-message").textContent = "⚠️ Données invalides";
        return;
    }

    // Supprime le message d'erreur si les données sont valides
    document.getElementById("error-message").textContent = "";

    const taille = tailleCm / 100;
    const imc = poids / (taille * taille);

    // Met à jour la jauge en fonction de l'IMC
    updateGauge(imc);

    // Détermine la catégorie IMC et la couleur associée
    let category = "";
    let percent = 0;
    let color = "";

    if (imc < IMC_MIN_MAIGREUR) {
        category = "Maigreur";
        percent = 10;
        color = "#3b82f6";
    } else if (imc < IMC_MAX_NORMAL) {
        category = "Poids normal";
        percent = 30;
        color = "#22c55e";
    } else if (imc < IMC_MAX_SURPOIDS) {
        category = "Surpoids";
        percent = 50;
        color = "#eab308";
    } else if (imc < IMC_MAX_OBESITE_MODEREE) {
        category = "Obésité modérée";
        percent = 70;
        color = "#f59e0b";
    } else if (imc < IMC_MAX_OBESITE_SEVERE) {
        category = "Obésité sévère";
        percent = 85;
        color = "#ef4444";
    } else {
        category = "Obésité très sévère";
        percent = 95;
        color = "#b91c1c";
    }

    // Affiche l'IMC, la catégorie et applique la couleur correspondante
    document.getElementById("imcText").textContent =
        `Votre IMC est de ${imc.toFixed(1)}`;

    document.getElementById("categoryText").textContent =
        `Catégorie : ${category}`;

    document.getElementById("imcText").style.color = color;
    document.getElementById("categoryText").style.color = color;
}


/*
IMC → position (%) sur une jauge en 6 zones (~16.66% chacune)

Dans chaque zone :
- on calcule la progression de l’IMC dans l’intervalle :    
(imc - min) / (max - min) → valeur entre 0 et 1
- on convertit en % de la zone (*16.66)
- on ajoute le décalage de la zone (0, 16.66, 33.33, 50, 66.66, 83.33)
*/

function updateGauge(imc) {

    const indicator = document.getElementById("indicator");

    let percent = 100;

    // Zone 1 : Maigreur (0 -> IMC_MIN_MAIGREUR)
    if (imc < IMC_MIN_MAIGREUR) {
        percent = (imc / IMC_MIN_MAIGREUR) * ZONE_SIZE;
    }

    // Zone 2 : Poids normal (IMC_MIN_MAIGREUR -> IMC_MAX_NORMAL)
    else if (imc < IMC_MAX_NORMAL) {
        percent = ZONE_SIZE +
            ((imc - IMC_MIN_MAIGREUR) / (IMC_MAX_NORMAL - IMC_MIN_MAIGREUR)) * ZONE_SIZE;
    }

    // Zone 3 : Surpoids (IMC_MAX_NORMAL -> IMC_MAX_SURPOIDS)
    else if (imc < IMC_MAX_SURPOIDS) {
        percent = 2 * ZONE_SIZE +
            ((imc - IMC_MAX_NORMAL) / (IMC_MAX_SURPOIDS - IMC_MAX_NORMAL)) * ZONE_SIZE;
    }

    // Zone 4 : Obésité modérée (IMC_MAX_SURPOIDS -> IMC_MAX_OBESITE_MODEREE)
    else if (imc < IMC_MAX_OBESITE_MODEREE) {
        percent = 3 * ZONE_SIZE +
            ((imc - IMC_MAX_SURPOIDS) / (IMC_MAX_OBESITE_MODEREE - IMC_MAX_SURPOIDS)) * ZONE_SIZE;
    }

    // Zone 5 : Obésité sévère (IMC_MAX_OBESITE_MODEREE -> IMC_MAX_OBESITE_SEVERE)
    else if (imc < IMC_MAX_OBESITE_SEVERE) {
        percent = 4 * ZONE_SIZE +
            ((imc - IMC_MAX_OBESITE_MODEREE) / (IMC_MAX_OBESITE_SEVERE - IMC_MAX_OBESITE_MODEREE)) * ZONE_SIZE;
    }

    // Zone 6 : Obésité très sévère (> IMC_MAX_OBESITE_SEVERE)
    else {
        // Progression au-delà de la dernière zone
        const progress = (imc - IMC_MAX_OBESITE_SEVERE) / 10;

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
document.getElementById("btnCalcul").addEventListener("click", calculerIMC);