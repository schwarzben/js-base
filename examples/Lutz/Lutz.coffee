###
  Lutzen in Coffeescript
  Frei nach: Stochastische Texte – Theo Lutz, 1959
  http://www.netzliteratur.net/lutz_schule.htm
###

# Die verwendeten 16 Subjekte (mit Index für das Geschlecht)
Subjects = [
  ["GRAF"    ,0]
  ["FREMDE"  ,0]
  ["BLICK"   ,0]
  ["KIRCHE"  ,1]
  ["SCHLOSS" ,1]
  ["BILD"    ,2]
  ["AUGE"    ,2]
  ["DORF"    ,2]
  ["TURM"    ,0]
  ["BAUER"   ,0]
  ["WEG"     ,0]
  ["GAST"    ,0]
  ["TAG"     ,0]
  ["HAUS"    ,2]
  ["TISCH"   ,0]
  ["KNECHT"  ,0]
]
"
"

Adjectives = [
  "OFFEN"
  "STILL"
  "STARK"
  "GUT"
  "SCHMAL"
  "NAH"
  "NEU"
  "LEISE"
  "FERN"
  "TIEF"
  "SPAET"
  "DUNKEL"
  "FREI"
  "GROSS"
  "ALT"
  "WÜTEND"
}

###
  Die Bindewörter für die beiden erzeugten Sätze sollen die folgenden
  Häufigkeiten haben (daher gleich ein Array mit 8 Einträgen):
###
Glues = [
  "UND",                # 1/8
  "ODER",               # 1/8
  "SO GILT",            # 1/8
  ".",".",".",".","."   # 5/8
]

# Und 16 Prädikate
Predicates = [
  ["EIN","EINE","EIN"]
  ["JEDER","JEDE","JEDES"]
  ["KEIN","KEINE","KEINES"]
  ["NICHT JEDER","NICHT JEDE","NICHT JEDES"]
]

###
  Array shuffle Funktion nach:
  http://coffeescriptcookbook.com/chapters/arrays/shuffling-array-elements
###
shuffle = (a) ->
  # From the end of the list to the beginning, pick element `i`.
  for i in [a.length-1..1]
    # Choose random element `j` to the front of `i` to swap with.
    j = Math.floor Math.random() * (i + 1)
    # Swap `j` with `i`, using destructured assignment
    [a[i], a[j]] = [a[j], a[i]]
  # Return the shuffled array.
  return a


###
  Die Lutzen Funktion gibt die gewünschte Anzahl an Zeilen
  mit gelutztem Text zurück.
###
lutzen = (lines) ->
  ###
    Vor dem Lutzen werden alle Wort-Arrays auf gleiche Länge gebracht
  ###
  subjects   = Subjects.concat Subjects
  adjectives = Adjectives.concat Adjectives
  glues      = Glues.concat Glues
  predicates = []
  predicates.push Predicates... for i in [0...8]

  for l in [0...lines]

    # Da nur max 16 Subjekte vorhanden sind, loopen wir mit Modulo 16
    # zwischen 0 und 15
    i = l%16
    
    # Am Ende eines Durchgangs werden alle Wort-Arrays erneut gemischt
    [subjects,adjectives,glues,predicates].map shuffle if i is 0

    # Picke die Worte für den Satz aus den Listen/Arrays
    subject1   = subjects[i][0]
    subject2   = subjects[i+15][0]
    gender1    = subjects[i][1]
    gender2    = subjects[i][1]
    predicate1 = predicates[i][gender1]
    predicate2 = predicates[i+15][gender2]
    adjective1 = adjectives[i]
    adjective2 = adjectives[i+15]
    glue = if glues[i] isnt "." then " #{glues[i]} " else "#{glues[i]} "

    # Baue den Satz
    "#{predicate1} #{subject1} IST #{adjective1} #{glue} #{predicate2} #{subject2} IST #{adjective2}."


###
  Ein Lutzen-Beispiel mit 32 Zeilen
###

poesie = lutzen(32)
console.log poesie.join "\n"


  
