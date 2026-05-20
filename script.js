function calculerIMC() {

    const poids = parseFloat(document.getElementById("poids").value);
    const tailleCm = parseFloat(document.getElementById("taille").value);
    
    // Vérification des données : doit être un nombre et positif
    if (isNaN(poids) || isNaN(tailleCm) || poids <= 0 || tailleCm <= 0) {
        document.getElementById("result").textContent = "⚠️ Données invalides";
        return;
    }

    const taille = tailleCm / 100;
    const imc = poids / (taille * taille);

    // Affiche le résultat de l'IMC 
    document.getElementById("result").textContent = `IMC : ${imc.toFixed(1)}`;

    // Met à jour la jauge en fonction de l'IMC
    updateGauge(imc);

    // Détermine la catégorie IMC et la couleur associée
    let category = "";
    let percent = 0;
    let color = "";

    if (imc < 18.5) {
        category = "Maigreur";
        percent = 10;
        color = "#3b82f6";
    } else if (imc < 25) {
        category = "Poids normal";
        percent = 30;
        color = "#22c55e";
    } else if (imc < 30) {
        category = "Surpoids";
        percent = 50;
        color = "#eab308";
    } else if (imc < 35) {
        category = "Obésité modérée";
        percent = 70;
        color = "#f59e0b";
    } else if (imc < 40) {
        label = "Obésité sévère";
        percent = 85;
        color = "#ef4444";
    } else {
        category = "Obésité importante";
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

/* Mise à jour de la position de la jauge selon l’IMC */
function updateGauge(imc) {

    const indicator = document.getElementById("indicator");

    let percent = 0;

    // Détermine la position de l'indicateur selon la catégorie IMC
    if (imc < 18.5) percent = 10;
    else if (imc < 25) percent = 30;
    else if (imc < 30) percent = 50;
    else if (imc < 35) percent = 70;
    else if (imc < 40) percent = 85;
    else percent = 95;

    // Déplace l'indicateur sur la jauge
    indicator.style.left = percent + "%";
}


// Lance le calcul au clic sur le bouton
document.getElementById("btnCalcul").addEventListener("click", calculerIMC);