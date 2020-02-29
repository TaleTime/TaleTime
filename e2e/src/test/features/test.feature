# language: en

  Feature: Checking navigation features

  Scenario: This scenario is used to check the availability of the Web site.
    Given is the URL "http://localhost:8100".
    When the URL is entered in the browser,
    Then the TaleTime startpage should appear.

  Scenario: This scenario checks if the user can navigate from the start page to the Registration-Form
    Given the start page "http://localhost:8100" is opened
    When the user clicks on Registration-Button
    Then the Registration-Form should open

