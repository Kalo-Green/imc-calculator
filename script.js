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

}
// Lance le calcul au clic sur le bouton
document.getElementById("btnCalcul").addEventListener("click", calculerIMC);
