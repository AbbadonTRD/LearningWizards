import { LearningContent, Exercise } from '../types';

export const learningContent: LearningContent[] = [
  {
    id: 1,
    title: "Lernziel 1: Grundrechte und Menschenrechte",
    content: `<h1 class="text-3xl font-bold mb-4">Grundrechte und Menschenrechte</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie die Grundrechte und Menschenrechte in der Schweiz.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Grundrechte sind fundamentale Rechte, die jedem Menschen zustehen. In der Schweizer Bundesverfassung sind sie in den Artikeln 7-36 verankert.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Wichtige Grundrechte:</h2>

    <div class="ml-4 mb-6">
      • Menschenwürde (Art. 7)<br>
      • Rechtsgleichheit (Art. 8)<br>
      • Schutz vor Willkür (Art. 9)<br>
      • Glaubens- und Gewissensfreiheit (Art. 15)<br>
      • Meinungsfreiheit (Art. 16)<br>
      • Recht auf Leben (Art. 10)
    </div>`,
    category: "Grundrechte",
    isLocked: false
  },
  {
    id: 2,
    title: "Lernziel 2: Geschichte der Schweiz",
    content: `<h1 class="text-3xl font-bold mb-4">Die Geschichte der Schweiz</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie die wichtigsten Eckpfeiler der Schweizer Geschichte.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Die Geschichte der Schweiz ist geprägt von der Entwicklung von einem losen Bündnis zu einem modernen Bundesstaat.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Wichtige historische Ereignisse:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">1. Gründungsmythos:</h3>
    <div class="ml-4 mb-6">
      • Rütlischwur 1291<br>
      • Bündnis der Urkantone<br>
      • Wilhelm Tell Sage<br>
      • Befreiung von fremder Herrschaft
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">2. Weg zum Bundesstaat:</h3>
    <div class="ml-4 mb-6">
      • Alte Eidgenossenschaft<br>
      • Helvetische Republik<br>
      • Bundesvertrag 1815<br>
      • Bundesverfassung 1848
    </div>`,
    category: "Geschichte",
    isLocked: false
  },
  {
    id: 3,
    title: "Lernziel 3: Die drei Ebenen der Politik",
    content: `<h1 class="text-3xl font-bold mb-4">Der Aufbau der Schweiz</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie die drei Ebenen der Schweizer Politik.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Das politische System der Schweiz ist föderalistisch aufgebaut und besteht aus drei Ebenen.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Die drei politischen Ebenen:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">1. Bundesebene:</h3>
    <div class="ml-4 mb-6">
      • Parlament (National- und Ständerat)<br>
      • Bundesrat<br>
      • Bundesgericht<br>
      • Zuständig für Aussenpolitik, Verteidigung, etc.
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">2. Kantonsebene:</h3>
    <div class="ml-4 mb-6">
      • 26 Kantone<br>
      • Eigene Verfassungen und Gesetze<br>
      • Kantonsparlamente<br>
      • Zuständig für Bildung, Gesundheit, etc.
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">3. Gemeindeebene:</h3>
    <div class="ml-4 mb-6">
      • Über 2000 Gemeinden<br>
      • Lokale Autonomie<br>
      • Gemeindeversammlungen<br>
      • Zuständig für lokale Aufgaben
    </div>`,
    category: "Politisches System",
    isLocked: false
  },
  {
    id: 4,
    title: "Lernziel 4: Gewaltenteilung",
    content: `<h1 class="text-3xl font-bold mb-4">Die Gewaltenteilung in der Schweiz</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie das Prinzip der Gewaltenteilung und ihre Bedeutung für die Demokratie.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Die Gewaltenteilung ist ein fundamentales Prinzip der Schweizer Demokratie.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Die drei Gewalten:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">1. Legislative (Gesetzgebung):</h3>
    <div class="ml-4 mb-6">
      • Parlament (National- und Ständerat)<br>
      • Erlässt Gesetze<br>
      • Kontrolliert Regierung und Verwaltung
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">2. Exekutive (Ausführung):</h3>
    <div class="ml-4 mb-6">
      • Bundesrat und Verwaltung<br>
      • Führt Gesetze aus<br>
      • Leitet die Verwaltung
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">3. Judikative (Rechtsprechung):</h3>
    <div class="ml-4 mb-6">
      • Gerichte<br>
      • Spricht Recht<br>
      • Unabhängig von anderen Gewalten
    </div>`,
    category: "Politisches System",
    isLocked: false
  },
  {
    id: 5,
    title: "Lernziel 5: Föderalismus",
    content: `<h1 class="text-3xl font-bold mb-4">Der Föderalismus in der Schweiz</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie das föderalistische System der Schweiz.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Der Föderalismus ist ein Grundprinzip der Schweizer Staatsorganisation.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Merkmale des Föderalismus:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">1. Aufgabenteilung:</h3>
    <div class="ml-4 mb-6">
      • Klare Zuständigkeiten<br>
      • Subsidiaritätsprinzip<br>
      • Kantonale Autonomie
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">2. Finanzautonomie:</h3>
    <div class="ml-4 mb-6">
      • Eigene Steuern<br>
      • Finanzausgleich<br>
      • Budgethoheit
    </div>`,
    category: "Politisches System",
    isLocked: true
  },
  {
    id: 6,
    title: "Lernziel 6: Die Bundesverfassung",
    content: `<h1 class="text-3xl font-bold mb-4">Die Bundesverfassung der Schweiz</h1>
    <p class="text-gray-400 mb-8">Lernen Sie die wichtigsten Aspekte der Schweizer Bundesverfassung kennen.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Die Bundesverfassung ist das rechtliche Fundament der Schweiz.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Wichtige Bestandteile:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">1. Grundrechte:</h3>
    <div class="ml-4 mb-6">
      • Menschenwürde<br>
      • Rechtsgleichheit<br>
      • Schutz vor Willkür<br>
      • Glaubens- und Gewissensfreiheit
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">2. Staatsorganisation:</h3>
    <div class="ml-4 mb-6">
      • Gewaltenteilung<br>
      • Föderalismus<br>
      • Demokratische Grundsätze<br>
      • Wirtschaftsordnung
    </div>`,
    category: "Verfassung",
    isLocked: true
  },
  {
    id: 7,
    title: "Lernziel 7: Wählen und Abstimmen",
    content: `<h1 class="text-3xl font-bold mb-4">Wählen und Abstimmen in der Schweiz</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie den Unterschied zwischen aktivem und passivem Wahlrecht sowie die verschiedenen Abstimmungsformen.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Das Wahl- und Stimmrecht sind zentrale Elemente der direkten Demokratie in der Schweiz.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Wahlrecht:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">1. Aktives Wahlrecht:</h3>
    <div class="ml-4 mb-6">
      • Recht zu wählen<br>
      • Ab 18 Jahren<br>
      • Für Schweizer Bürger<br>
      • Auf allen drei Staatsebenen
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">2. Passives Wahlrecht:</h3>
    <div class="ml-4 mb-6">
      • Recht, gewählt zu werden<br>
      • Ebenfalls ab 18 Jahren<br>
      • Nur für Schweizer Bürger<br>
      • Zusätzliche Anforderungen je nach Amt
    </div>`,
    category: "Politische Rechte",
    isLocked: true
  },
  {
    id: 8,
    title: "Lernziel 8: Majorzwahl",
    content: `<h1 class="text-3xl font-bold mb-4">Die Majorzwahl</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie das Majorzwahlsystem und seine Anwendung in der Schweiz.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Bei der Majorzwahl (Mehrheitswahl) gewinnt der Kandidat oder die Kandidatin mit den meisten Stimmen.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Merkmale der Majorzwahl:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">Vorteile:</h3>
    <div class="ml-4 mb-6">
      • Einfach verständlich<br>
      • Klare Mehrheitsverhältnisse<br>
      • Direkte Personenwahl<br>
      • Stabile Regierungen
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">Nachteile:</h3>
    <div class="ml-4 mb-6">
      • Minderheiten weniger vertreten<br>
      • Stimmen für Verlierer gehen verloren<br>
      • Kann zu Verzerrungen führen<br>
      • Begünstigt große Parteien
    </div>`,
    category: "Wahlsysteme",
    isLocked: true
  },
  {
    id: 9,
    title: "Lernziel 9: Proporzwahl",
    content: `<h1 class="text-3xl font-bold mb-4">Die Proporzwahl</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie das Proporzwahlsystem und seine Anwendung in der Schweiz.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Die Proporzwahl (Verhältniswahl) verteilt die Sitze entsprechend dem Stimmenanteil der Parteien.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Merkmale der Proporzwahl:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">Vorteile:</h3>
    <div class="ml-4 mb-6">
      • Bessere Vertretung von Minderheiten<br>
      • Gerechtere Sitzverteilung<br>
      • Weniger verlorene Stimmen<br>
      • Vielfältigeres Parlament
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">Nachteile:</h3>
    <div class="ml-4 mb-6">
      • Komplexeres System<br>
      • Schwierigere Mehrheitsbildung<br>
      • Weniger stabile Regierungen<br>
      • Parteienlisten statt Personen
    </div>`,
    category: "Wahlsysteme",
    isLocked: true
  },
  {
    id: 10,
    title: "Lernziel 10: Arten des Mehr",
    content: `<h1 class="text-3xl font-bold mb-4">Die verschiedenen Arten des Mehr</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie die unterschiedlichen Mehrheitsformen bei Abstimmungen.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Je nach Art der Abstimmung sind verschiedene Mehrheiten erforderlich.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Wichtige Mehrheitsformen:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">1. Absolutes Mehr:</h3>
    <div class="ml-4 mb-6">
      • Mehr als 50% der gültigen Stimmen<br>
      • Beispiel: 100 Stimmen → mind. 51 nötig<br>
      • Oft bei wichtigen Entscheidungen<br>
      • Bei Verfassungsänderungen
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">2. Relatives Mehr:</h3>
    <div class="ml-4 mb-6">
      • Einfache Mehrheit genügt<br>
      • Mehr Stimmen als andere Optionen<br>
      • Bei weniger wichtigen Entscheiden<br>
      • In Gemeindeversammlungen
    </div>`,
    category: "Abstimmungen",
    isLocked: true
  },
  {
    id: 11,
    title: "Lernziel 11: Proporzwahl-Methoden",
    content: `<h1 class="text-3xl font-bold mb-4">Methoden der Proporzwahl</h1>
    <p class="text-gray-400 mb-8">Verstehen Sie die verschiedenen Möglichkeiten bei der Proporzwahl.</p>

    <div class="bg-green-500/20 p-4 rounded-lg mb-6">
      Die Proporzwahl kennt verschiedene Methoden zur Sitzverteilung.
    </div>

    <h2 class="text-2xl font-bold mb-4 text-yellow-400">Wichtige Methoden:</h2>

    <h3 class="text-xl font-bold mb-2 text-blue-400">1. Kumulieren:</h3>
    <div class="ml-4 mb-6">
      • Mehrfaches Aufführen von Kandidaten<br>
      • Maximal zweimal pro Liste<br>
      • Verstärkt Wahlchancen
    </div>

    <h3 class="text-xl font-bold mb-2 text-blue-400">2. Panaschieren:</h3>
    <div class="ml-4 mb-6">
      • Kandidaten verschiedener Listen wählen<br>
      • Freie Listenzusammenstellung<br>
      • Personenbezogene Wahl
    </div>`,
    category: "Wahlsysteme",
    isLocked: true
  }
];

export const exercises: Exercise[] = [
  {
    id: 1,
    title: "Grundrechte und Menschenrechte",
    question: "Ordnen Sie die folgenden Rechte den entsprechenden Artikeln der Bundesverfassung zu:",
    type: "multiple-choice",
    content: {
      options: [
        "Recht auf Leben - Art. 10",
        "Glaubens- und Gewissensfreiheit - Art. 15",
        "Meinungsfreiheit - Art. 16",
        "Eigentumsgarantie - Art. 26"
      ],
      correctAnswer: "Recht auf Leben - Art. 10"
    }
  },
  {
    id: 2,
    title: "Geschichte der Schweiz",
    question: "Welche der folgenden Aussagen über die Schweizer Geschichte ist korrekt?",
    type: "multiple-choice",
    content: {
      options: [
        "Die Schweiz wurde 1291 als moderner Bundesstaat gegründet",
        "Der Rütlischwur ist historisch belegt",
        "Die erste Bundesverfassung stammt von 1848",
        "Wilhelm Tell war der erste Bundespräsident"
      ],
      correctAnswer: "Die erste Bundesverfassung stammt von 1848"
    }
  },
  {
    id: 3,
    title: "Die drei Ebenen der Politik",
    question: "Nennen Sie die drei politischen Ebenen der Schweiz",
    type: "text-input",
    content: {
      textAnswer: "Bund,Kantone,Gemeinden"
    }
  },
  {
    id: 4,
    title: "Gewaltenteilung",
    question: "Welche Aussage zur Gewaltenteilung ist richtig?",
    type: "multiple-choice",
    content: {
      options: [
        "Die Legislative führt die Gesetze aus",
        "Die Exekutive macht die Gesetze",
        "Die Judikative spricht Recht",
        "Der Bundesrat ist Teil der Legislative"
      ],
      correctAnswer: "Die Judikative spricht Recht"
    }
  },
  {
    id: 5,
    title: "Föderalismus",
    question: "Welche der folgenden Aussagen zum Föderalismus ist korrekt?",
    type: "multiple-choice",
    content: {
      options: [
        "Der Bund ist allein für die Bildung zuständig",
        "Die Kantone haben keine eigenen Verfassungen",
        "Die Gemeinden sind dem Bund direkt unterstellt",
        "Jeder Kanton hat seine eigene Verfassung"
      ],
      correctAnswer: "Jeder Kanton hat seine eigene Verfassung"
    }
  },
  {
    id: 6,
    title: "Bundesverfassung",
    question: "Was ist die wichtigste Funktion der Bundesverfassung?",
    type: "multiple-choice",
    content: {
      options: [
        "Sie regelt nur kantonale Angelegenheiten",
        "Sie legt die grundlegenden Rechte und Pflichten fest",
        "Sie bestimmt nur die Zusammensetzung des Bundesrats",
        "Sie regelt ausschließlich internationale Beziehungen"
      ],
      correctAnswer: "Sie legt die grundlegenden Rechte und Pflichten fest"
    }
  },
  {
    id: 7,
    title: "Wählen und Abstimmen",
    question: "Was ist der Unterschied zwischen aktivem und passivem Wahlrecht?",
    type: "multiple-choice",
    content: {
      options: [
        "Aktives Wahlrecht bedeutet wählen zu dürfen, passives gewählt werden zu können",
        "Aktives Wahlrecht ist für Ausländer, passives für Schweizer",
        "Aktives Wahlrecht gilt ab 16, passives ab 18 Jahren",
        "Es gibt keinen Unterschied zwischen beiden"
      ],
      correctAnswer: "Aktives Wahlrecht bedeutet wählen zu dürfen, passives gewählt werden zu können"
    }
  },
  {
    id: 8,
    title: "Majorzwahl",
    question: "Was ist das Hauptmerkmal der Majorzwahl?",
    type: "multiple-choice",
    content: {
      options: [
        "Die Sitze werden proportional verteilt",
        "Der Kandidat mit den meisten Stimmen gewinnt",
        "Alle Kandidaten bekommen einen Sitz",
        "Die Parteistärke ist entscheidend"
      ],
      correctAnswer: "Der Kandidat mit den meisten Stimmen gewinnt"
    }
  },
  {
    id: 9,
    title: "Proporzwahl",
    question: "Was ist das Hauptmerkmal der Proporzwahl?",
    type: "multiple-choice",
    content: {
      options: [
        "Der Kandidat mit den meisten Stimmen gewinnt",
        "Die Sitze werden proportional zur Stimmenzahl verteilt",
        "Nur die größte Partei bekommt Sitze",
        "Es gibt keine Mindestanzahl an Stimmen"
      ],
      correctAnswer: "Die Sitze werden proportional zur Stimmenzahl verteilt"
    }
  },
  {
    id: 10,
    title: "Arten des Mehr",
    question: "Was bedeutet absolutes Mehr?",
    type: "multiple-choice",
    content: {
      options: [
        "Mehr als 50% der gültigen Stimmen",
        "Die meisten Stimmen aller Optionen",
        "Alle Stimmen müssen gleich sein",
        "Zwei Drittel der Stimmen"
      ],
      correctAnswer: "Mehr als 50% der gültigen Stimmen"
    }
  },
  {
    id: 11,
    title: "Proporzwahl-Methoden",
    question: "Was bedeutet Kumulieren?",
    type: "multiple-choice",
    content: {
      options: [
        "Kandidaten von verschiedenen Listen wählen",
        "Einen Kandidaten mehrfach auf der Liste aufführen",
        "Alle Kandidaten durchstreichen",
        "Eine neue Liste erstellen"
      ],
      correctAnswer: "Einen Kandidaten mehrfach auf der Liste aufführen"
    }
  }
];