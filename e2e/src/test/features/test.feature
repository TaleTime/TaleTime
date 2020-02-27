# language: en

  Feature: These scenarios are used to check the functionality from a business perspective.

  Scenario: This scenario is used to check the availability of the Web site.
    Given is the URL "http://localhost:8100".
    When the URL is entered in the browser,
    Then the TaleTime startpage should appear.

