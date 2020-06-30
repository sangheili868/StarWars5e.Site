export default '0.4.14'

/*
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
