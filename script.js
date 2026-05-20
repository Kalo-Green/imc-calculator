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

}

// Gestion de la jauge IMC 
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
