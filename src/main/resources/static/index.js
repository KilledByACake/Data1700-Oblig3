function regBestilling() {
    const film = $("#velgFilm").find(":selected").text();
    const antall = $("#antall").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const adresse = $("#adresse").val();
    const telefonnr = $("#telefonnr").val();
    const epost = $("#epost").val();

    // Først valider inputfeltene
    let feilmeldinger = validerInputOgHentFeilmeldinger(film, antall, fornavn, etternavn, adresse, telefonnr, epost);

    // Hvis det er feil, stopp prosessen og informer brukeren
    if (feilmeldinger.length > 0) {
        console.log(feilmeldinger);
        return; // Stopper funksjonen fra å gå videre
    }

    // Oppretter et bestillingsobjekt for å sende til serveren
    const bestilling = {
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        adresse: adresse,
        telefonnr: telefonnr,
        epost: epost
    };

    // Sender bestilling til serveren
    $.post("/lagre", bestilling).done(function(response) {
        alert("Bestilling lagret suksessfullt");
        hentAlle();
    }).fail(function() {
        alert("Det oppstod en feil under lagring av bestillingen.");
    });

    // Tømmer input-feltene etter sending
    $("#velgFilm").val("velgfilm");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#adresse").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

function hentAlle() {
    $.get( "/hentAlle", function( data ) {
        formaterData(data);
    });
}

function formaterData(bestillinger){
    let ut = "<table><tr>" +
        "<th>Film</th>" +
        "<th>Antall B</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Adresse</th>" +
        "<th>Telefonnummer</th>" +
        "<th>Epost</th>" +
        "</tr>";
    for (const bestilling of bestillinger){
        ut+="<tr>" +
            "<td>"+bestilling.film+"</td>" +
            "<td>"+bestilling.antall+"</td>" +
            "<td>"+bestilling.fornavn+"</td>" +
            "<td>"+bestilling.etternavn+"</td>" +
            "<td>"+bestilling.adresse+"</td>" +
            "<td>"+bestilling.telefonnr+"</td>" +
            "<td>"+bestilling.epost+"</td>" +
            "</tr>";
    }
    ut+="</table>";
    $("#bestillingene").html(ut);
}


//Validering og feilmeldinger
function validerInputOgHentFeilmeldinger(film, antall, fornavn, etternavn, adresse, telefonnr, epost) {
    const telefonRegex = /^\d{8}$/;
    const navnRegex = /^[a-zA-ZæøåÆØÅ\s]+$/;
    const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const adresseRegex = /^[a-zA-Z0-9æøåÆØÅ\s.,'-]+$/;

    clearErrorMessages();  // Tømmer alle tidligere feilmeldinger før validering

    if (film === "") {
        setError("film", "Du må velge film for å kjøpe billett.");
    }
    if (!antall || isNaN(antall) || parseInt(antall) < 1) {
        setError("antall", "Du må velge et gyldig tall for antall billetter.");
    }
    if (!fornavn || !navnRegex.test(fornavn)) {
        setError("fornavn", "Du må fylle ut fornavn for å kjøpe billett.");
    }
    if (!etternavn || !navnRegex.test(etternavn)) {
        setError("etternavn", "Du må fylle ut etternavn for å kjøpe billett.");
    }
    if (!adresse || !adresseRegex.test(adresse)) {
        setError("adresse", "Du må oppgi en gyldig adresse.");
    }
    if (!telefonnr || !telefonRegex.test(telefonnr)) {
        setError("telefonnr", "Du må skrive inn et gyldig telefonnummer.");
    }
    if (!epost || !epostRegex.test(epost)) {
        setError("epost", "Du må fylle inn en gyldig e-postadresse.");
    }
}

function setError(inputId, message) {
    const errorElementId = inputId + "Error"; // Legger til 'Error' til ID for å finne riktig span
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message; // Setter feilmeldingen
        errorElement.style.display = 'block'; // Sørger for at feilmeldingen vises
    }
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = ''; // Tømmer tekst
        element.style.display = 'none'; // Skjuler elementet
    });
}
