function regBestilling() {
    const bestilling = {
        film: $("#velgFilm").find(":selected").text(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        adresse: $("#adresse").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    // Først valider inputfeltene
    if (validerInputOgHentFeilmeldinger(bestilling)) {
        return; // Det er feil, avbryter sendingen
    }

    // Sender bestilling til serveren
    $.post("/lagre", bestilling).done(function(response) {
        alert("Bestilling lagret suksessfullt");
        hentAlle();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Det oppstod en feil under lagring av bestillingen: " + jqXHR.status + " " + jqXHR.statusText);
        console.error("Feil detaljer:", textStatus, errorThrown);
        console.error("Serverrespons:", jqXHR.responseText); // Skriver ut svaret fra serveren for ytterligere analyse
    });

    // Tømmer input-feltene etter sending
    $("#velgFilm").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#adresse").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

// Validering og feilmeldinger
function validerInputOgHentFeilmeldinger(bestilling) {
    const regler = [
        {felt: 'film', verdi: bestilling.film, regex: /.+/, feilmelding: "Du må velge film for å kjøpe billett."},
        {felt: 'antall', verdi: bestilling.antall, regex: /^\d+$/, feilmelding: "Du må velge et gyldig tall for antall billetter.", ekstraSjekk: val => parseInt(val) >= 1},
        {felt: 'fornavn', verdi: bestilling.fornavn, regex: /^[a-zA-ZæøåÆØÅ\s]+$/, feilmelding: "Du må fylle ut fornavn for å kjøpe billett."},
        {felt: 'etternavn', verdi: bestilling.etternavn, regex: /^[a-zA-ZæøåÆØÅ\s]+$/, feilmelding: "Du må fylle ut etternavn for å kjøpe billett."},
        {felt: 'adresse', verdi: bestilling.adresse, regex: /^[a-zA-Z0-9æøåÆØÅ\s.,'-]+$/, feilmelding: "Du må oppgi en gyldig adresse."},
        {felt: 'telefonnr', verdi: bestilling.telefonnr, regex: /^\d{8}$/, feilmelding: "Du må skrive inn et gyldig telefonnummer."},
        {felt: 'epost', verdi: bestilling.epost, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, feilmelding: "Du må fylle inn en gyldig e-postadresse."}
    ];

    clearErrorMessages();
    regler.forEach(regel => {
        if (!regel.verdi.match(regel.regex) || (regel.ekstraSjekk && !regel.ekstraSjekk(regel.verdi))) {
            setError(regel.felt, regel.feilmelding);
        }
    });

    // Sjekk om det er noen feil
    const erDetFeil = document.querySelectorAll('.error-message:empty').length !== regler.length;

    // Hvis det er noen feil, vis en alert
    if (erDetFeil) {
        alert("Venligst fyll ut informasjonen");
    }


    // Returner om det er noen feil
    return document.querySelectorAll('.error-message:empty').length !== regler.length;
}

function setError(inputId, message) {
    const errorElementId = inputId + "Error";
    const errorElement = document.getElementById(errorElementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}


//Henter bestilling
function hentAlle() {
    $.get( "/hentAlle", function( data ) {
        formaterData(data);
    });
}

function formaterData(bestillinger){
    let ut = "<table><tr>" +
        "<th>Film</th>" +
        "<th>Antall</th>" +
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

//Sletting av bestilling
function slettB() {
    $.get( "/slettAlle", function() {
        hentAlle();
    });
}
