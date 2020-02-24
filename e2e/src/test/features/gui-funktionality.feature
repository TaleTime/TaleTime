# language: de
  Funktionalität: Diese .ferature-Datei überprüft die Funktionalität der Graphischen Öberfläche der TaleTime Applikation.

    Szenario: Überprüfung, der Erreichbarkeit der URL.
    Gegeben sei die URL "https://tale-time.web.app".
      Wenn die URL im Browser eingetragen wird,
      Dann soll die TaleTime Startpage erscheinen.

    Szenario: Überprüfung, ob ein Account angelegt werden kann.
      Gegeben seien folgende User Login Daten:
      |Bezeichnung :      | Wert:                 |
      |Name               | Karl Tester           |
      |E-Mail             | Karl@htwsaarTest.de   |
      |PIN                | 1234                  |
      Wenn diese Daten eingetragen werden
      Und auf Erstellen geklickt wird
      Dann soll ein neuer User existieren.

    Szenario: Überprüfung, ob ein neues Profil innerhalb eines Account angelegt werden kann.
      Gegeben sei ein eingeloggter User
      Wenn ein neues Profil mit dem Namen "Test Kind" erstellt wird
      Dann soll ein neues Profil zu Verfügung stehen

