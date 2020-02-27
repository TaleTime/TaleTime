# language: en
  Feature: This .ferature file checks the functionality of the graphical user interface of the TaleTime application.

    Scenario: Check the accessibility of the TaleTime URL.
      Given is the URL "https://tale-time.web.app".
      When the URL is entered in the browser,
      Then the TaleTime startpage should appear.

    Scenario: Check if an account can be created
      Given are the following values:
      |Designation :      | Value:                |
      |Name               | Karl Tester           |
      |E-Mail             | Karl@htwsaarTest.de   |
      |PIN                | 1234                  |
      When these data are entered
      And The button Create was clicked
      Then a new user should exist.

    Scenario: Check if a new profile can be created within an account.
      Given  a logged-in user
      When a new profile called "Test Child" is created
      Then a new profile should be available

