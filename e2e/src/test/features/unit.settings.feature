# language: en

  Feature: Checking Settings-Module-Units

    Scenario: Testing the possibility to change the font size
      Given User is logged in and on the Settings-Page
      When User changes Font-Size to 14px
      Then Font size is 14px

