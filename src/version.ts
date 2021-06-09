export default '0.5.18'

/*
0.5.18
- Add Export To Foundry VTT button in the Character Menu

0.5.17
- Upped character limit per user to 50
- Added a user profile with a username that can be set and reset as needed. Not used anywhere, yet
- Tweaked some of the login/logout flow to make it a little more intuitive

0.5.16
- Fixed bug with half-human image showing error message (found by @Uproar)

0.5.15
- Add species thumbnails to search tables (suggested by @Rick Fisto)
- Added temporary workaround for probe mind prerequisite bug (found by @Kris)

0.5.14
- Fixed missing technician deployment in Starship navigation menu

0.5.13
- Updated filter choices for starship weapons and equipement to reflect changes in the text

0.5.12
- Fix bug with unequipped custom armor showing in armor list (found by @Adriel Wattson)

0.5.11
- Fix bug when exporting a monster without senses (found by @potroclo)

0.5.10
- Adjust hero image height
- Properly stack contact links on mobile

0.5.9
- Redesigned homepage again, but with @toddmoonbounce's suggestions

0.5.8
- Redesigned homepage to add more descriptive text
- Fix bug when a character has 0 max hit points from a tweak (found by @sakito86)
- Fix bug where level 5 Guardian max power level calculated incorrectly (found by @Bas)

0.5.7
- Fix bug with exporting monsters to roll20 when data is parsed incorrectly (found by @darthrevan1128)

0.5.6
- Fix bug where scouts get proficiency bonus added to initiative (found by @S'badu)

0.5.5
- Display multi-level features properly with new parsing strategy
- Display class and archetype features in the character builder

0.5.4
- Display species, archetype, and class features on the character sheet
- Allow Custom Backgrounds with any feat
- Fixed bug when trying to print characters with certain items (reported by @SGE17 and @Kraiten)

0.5.3
- Added undo button after clearing tweaks (suggested by @Proper_Indifference)
- Fixed a bug where sentinel max power level was calculated incorrectly (found by @NootjeMCBootje)

0.5.2
- Fixed issue where a ! icon appears next to Menu, but there is no message when it is clicked on.

0.5.1
- Fixed issue with images not loading
- Added error message when image fails to load

0.5.0
- Added login button
- Save characters to the cloud while logged in
- Allow up to 20 characters saved to an account
- Changed "My Content" to "Tools" and added My Characters page to manage multiple characters

0.4.39
- Add Ch. # to each book chapter in the navigation menus

0.4.38
- Upgrade to Vuetify version 2.3.19 to fix an issue where screen readers don't read contents of dropdown menus (reported by @zheadings#6134)

0.4.37
- Minor visual improvements to monster power modal

0.4.36
- Added links that open modals for each power in monster spellcasting blocks.

0.4.35
- Added button to export monster to roll20
- Fixed bug where backgrounds in the PHB chapter open to a blank page found by @SirFallout

0.4.34
- Added raw view of Expanded Content files. Can be found under Rules -> Expanded Content

0.4.33
- Allowed right click -> open in new tab for species table (requested by @Unicorn up, boys and @Adriel Wattson)

0.4.32
- Fix bug where character sheet doesn't load if you are a casting class that hasn't gotten casting yet (level 1 scout, etc)(found by @kschulze and @N1majneb)

0.4.31
- Fix bug with Multiclass Max Power Level calculation (found by @Adriel Wattson)

0.4.30
- Added PHB (Printable) to Assets
- Added buttons to navigate to relavant PHB sections from the top of customization option tables
- Added button to navigate to Archetypes from bottom of class details
- Changed PHB backgrounds page to tabular list of backgrounds below rules

0.4.29
- Added Menu button above Settings and Conditions in character sheet
- Moved Print Character Sheet and Export to Roll20 buttons from Settings into Menu
- Moved Create, Edit, Load, and Save Character buttons from the top of the character sheet into Menu button

0.4.28
- Add ability to change the description of a custom item after it is created (suggested by @vegcethepilot)
- Fix bug where custom weapons and armor are not equippable
- Fix bug where custom armor does not get listed under AC when equipped
- Fix bug where all custom weapons use d4 damage dice
- Fix bug where global and individual weapon tweaks were not applied to custom weapons (found by @vegcepilot)
- Fix bug where opening a starship modification description in the SOTG chapter page causes the page to jump to the top (found by @bear)

0.4.27
- Added Heresy's Species to sponsored content

0.4.26
- Added Notes to character sheet (by James WR)

0.4.25
- Added Export to Roll20 button in Character Sheet settings

0.4.24
- Fixed bug where equipment names don't show up on the printable character sheet, found by @BigRedJedi

0.4.23
- Added Merchandise link on Assets page

0.4.22
- Fixed bug where custom item descriptions don't show up, found by @Vacant Top Hat

0.4.21
- Add All Equipment option to equipment adder
- Fix Bug with Artificer Engineering not able to select tech powers found by @Side Waifu
- Allow adding enhanced items to characters in the character builder
- Allow attuning to enhanced items and limit attunement by proficiency bonus
- Reworked internal item typings

0.4.20
- Fixed Half-human layout issue

0.4.19
- Update Bob's Galactic Strongholds link
- Added Hugehuman's Force/Tech powers to sponsored content

0.4.18
- Added Bob's Galactic Strongholds to sponsored content

0.4.17
- Made most filters dynamic based on table content

0.4.16
- Disabled draggable list on mobile to deal with bug that prevented custom features from opening on mobile

0.4.15
- Fixed bug with tactical specialist max superiority dice calculation.

0.4.14
- Added Lightsaber Forms.

0.4.13
- Added Fighting Masteries.
- Added Fighting Styles.

0.4.12
- Added filtering by weapon property to the weapon table.
- Added filtering by armor property to the armor table.

0.4.11
- Added alcoholic beverage and spice categories to Gear table

0.4.10
- Fixed global search and added filters to the results

0.4.9
- Fix bug due to gaming sets renamed (found by @Halimeni)
- Warn the user if they have an item that no longer exists in the database

0.4.8
- Added Caster Type column to archetypes table
- Fixed issues with csting data missing from database (reported by @aelin ashryver galathynius)

0.4.7
- Added Drake's Shipyard to Assets page

0.4.6 (@cynicaloptimist)
- Added Draggable functionality to custom features

0.4.5
- Added Sponsored Content section on Assets page
- Updated equipment weight to handle a string
- Content update

0.4.4
- Fixed bug where level 3 sentinel has max power level 1 (found by @ItsMeDanielTheOne)

0.4.3
- Added Google Analytics support
- Updated asset links for EC

0.4.2
- Fixed bug when attempting to cache tables that do not have a version number in the data versions table (found by @ItsMeDanielTheOne)

0.4.1
- Fixed bug where blob cache versions were not being stored correctly, causing blobs to never update

0.4.0
- Use local cache instead of accessing database if not out of date
- Access data versions table to track version of local cache
- Show an alert if failure to connect to database
- Added Range filter to Force and Tech Power Tables (suggested by @alapornik)
- Added Alignment filter to Monsters table (suggested by @alapornik)
- Fixed bug where Introduction Navlink in PHB was always highlighted (found by @alapornik)
- Fixed bug where unarmed strike damage calculated incorrectly with custom die size (found by @san cron)

0.3.4
- Added Source column to powers tables
- Renamed builder version to just version

0.3.3
- Fix bug found by FelgrandKnight34 where tweaking saving throw proficiency does not work
- Prevent setting expertise for a saving throw

0.3.2
- Added Custom Items to the Equipment Panel and the Equipment Builder Step
- Allow setting a custom item's name, type, cost, weight, quantity, and description
- When a custom item is set as type armor and is equipped, display it under the character's armor class
- Allow setting a damage bonus, to-hit bonus, damage dice count, and damage dice size for custom weapons
- When a custom weapon is equipped, it appears in the weapons list

0.3.1
- Add gear that opens Character Builder Settings Menu
- Move Ability Score Generation Method and Hit Points Calculation method to Character Builder Settings Menu
- Add Enforce/Ignore Force Powers Prerequisites option to Character Builder Settings Menu
- When that option is enabled (enabled by default), don't allow selecting force powers when the prerequisite has not been selected
- Display force power prerequisites more clearly in Add Power menu
- Sort force powers in Add Power menu so that selected powers are on top, followed by powers known from other sources, available powers, and lastly disallowed powers (whether because you can't select more powers or you don't have the prerequisite)
- Fixed bug where you could choose a force power you already know from another class
- Implemented BuilderVersion tracking

0.3.0
- Make class and archetype detail popups in character builder wider.
- Add a button to view background details in character builder.
- Select skill and save proficiency level in the tweak popup, rather than the proficiencies page
- Allow Tool Expertise
- Allow manually adding powers, outside powers gained from class
- Add Cast Power Button next to power levels that automatically subtracts the appropriate number of tech/force points.
- Changed design of force attack modifiers and save DCs based on what alignments of powers you have.
- Use class tables to determine superiority max dice and dice size rather than formulas (Fixes bug with level 1/2 scholar having d4 superiority dice).
- Fix issues with calculating superiority dice when multiclassing
- Don't allow casting level 6 and higher powers more than once per long rest.
- Add an alignment filter to force power selectors
- Put selected powers at the top of the list in the selection popups
- Show character name in tab title

0.2.0
- Added  a link to Wretched Hives PDF in the assets page
- Changed "Monster Manual" button to say "Scum and Villainy" in the assets page
- Custom features and character description fields now support [markdown](https://paperhive.org/help/markdown)
- Removed tweaks from the settings menu. Now they can be accessed by clicking on the appropriate number/label. For example, click on "+1 Acrobatics" to tweak the acrobatics modifier.
- Implemented tweaking individual weapon damage dice, damage bonuses, and attack bonuses. You can still use global weapon tweaks.
- Fixed bug when calculating ability score improvements chosen for sith pureblood and zabrak
- Allow manually adding feats outside of ability score improvements.
- Changed "add" button at the bottom to plus icon in the top right corner for adding custom features, feats, equipment, languages, and proficiencies.

*/
