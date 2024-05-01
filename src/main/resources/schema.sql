CREATE TABLE Bestilling (
    id BIGINT AUTO_INCREMENT NOT NULL,
    film VARCHAR(255) NOT NULL,
    antall INTEGER NOT NULL,
    fornavn VARCHAR(255) NOT NULL,
    etternavn VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    telefonnr VARCHAR(10) NOT NULL,
    epost VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
