import re
import json

translations = {
  "kuhp-338": {
    "chapterEn": "Book II Chapter XIX - Crimes Against Life",
    "officialTextEn": "Any person who deliberately takes the life of another person shall be punished for manslaughter with a maximum imprisonment of fifteen years.",
    "explanationEn": "This article regulates the crime of ordinary (unpremeditated) murder. The main elements are 'deliberately' and 'taking the life of another person'. A person must have the intention (dolus) to take the victim's life. This is the foundational article for various types of crimes against human life."
  },
  "kuhp-340": {
    "chapterEn": "Book II Chapter XIX - Crimes Against Life",
    "officialTextEn": "Any person who deliberately and with prior calculation takes the life of another person shall be punished for premeditated murder, with death penalty, life imprisonment, or a maximum imprisonment of twenty years.",
    "explanationEn": "This is the article on premeditated murder. The difference from Article 338 is the element of 'prior calculation'. This means the perpetrator has time to think calmly before acting or canceling their intention. The punishment for this crime is the most severe, up to the death penalty."
  },
  "kuhp-351": {
    "chapterEn": "Book II Chapter XX - Maltreatment",
    "officialTextEn": "(1) Maltreatment shall be punished by a maximum imprisonment of two years and eight months or a maximum fine of four thousand five hundred rupiahs.\n(2) If the act results in severe injuries, the guilty person shall be punished by a maximum imprisonment of five years.\n(3) If it results in death, the punishment shall be a maximum imprisonment of seven years.\n(4) Intentional damage to health is equated with maltreatment.\n(5) Attempt to commit this crime is not punishable.",
    "explanationEn": "This is a catch-all article for maltreatment (inflicting physical pain on others). The Criminal Code does not define 'maltreatment', but jurisprudence interprets it as acts intentionally causing pain or injury to another person's body. The punishment increases in severity based on the impact of the victim's injuries."
  },
  "kuhp-362": {
    "chapterEn": "Book II Chapter XXII - Theft",
    "officialTextEn": "Any person who takes any property, which belongs wholly or partly to another person, with the intention of unlawfully owning it, shall be punished for theft with a maximum imprisonment of five years or a maximum fine of nine hundred rupiahs.",
    "explanationEn": "This is the standard formulation of the crime of theft. The main elements include the act of taking, tangible or intangible property (such as electricity), wholly or partly belonging to someone else, and the intention to own the property unlawfully (without right)."
  },
  "kuhp-372": {
    "chapterEn": "Book II Chapter XXIV - Embezzlement",
    "officialTextEn": "Any person who deliberately and unlawfully owns any property that belongs wholly or partly to another person, but which is under his control not due to a crime, shall be punished for embezzlement with a maximum imprisonment of four years or a maximum fine of nine hundred rupiahs.",
    "explanationEn": "Embezzlement differs from theft. In theft, the perpetrator 'takes' the property. In embezzlement, the object of the crime is already legally under the perpetrator's control (e.g., loaned or rented), and they abuse that control by claiming or acting as its owner unlawfully."
  },
  "kuhp-378": {
    "chapterEn": "Book II Chapter XXV - Fraud",
    "officialTextEn": "Any person who, with the intention of unlawfully benefiting himself or another person, by assuming a false name or false capacity, by cunning deceit, or a web of lies, induces another person to hand over any property to him, or to incur a debt or to renounce a claim, shall be punished for fraud with a maximum imprisonment of four years.",
    "explanationEn": "This is the article for the crime of fraud. The core of this article is a person's act of using means (false name, false capacity, cunning deceit, or a web of lies) to deceive a victim so that the victim voluntarily hands over their property to the perpetrator."
  },
  "kuhp-285": {
    "chapterEn": "Book II Chapter XIV - Crimes Against Decency",
    "officialTextEn": "Any person who by force or threat of force compels a woman to have sexual intercourse with him outside marriage, shall be punished for committing rape with a maximum imprisonment of twelve years.",
    "explanationEn": "This is the offense of rape in the Criminal Code (old book). Its main focus is the element of 'force or threat of force' to compel sexual intercourse. However, in modern law today, the definition and scope regarding this sexual crime have been much refined (as regulated in the Law on Crimes of Sexual Violence)."
  },
  "kuhp-303": {
    "chapterEn": "Book II Chapter XVI - Crimes Against Public Order",
    "officialTextEn": "Punished with a maximum imprisonment of ten years or a maximum fine of twenty-five million rupiahs, any person who without permission: 1. deliberately offers or provides an opportunity for gambling games and makes it a profession, or deliberately participates in an enterprise for that purpose; 2. deliberately offers or provides an opportunity to the general public to play gambling or deliberately participates in an enterprise for that purpose, regardless of whether the opportunity is subject to a condition or the fulfillment of a procedure; 3. makes participating in gambling games a profession.",
    "explanationEn": "This article provides a prohibition for organizers and those who make gambling a livelihood. All forms of games that base the hope of winning on luck (games of chance) and without explicit government permission are prohibited by law. This is also often associated with Article 303 bis."
  },
  "kuhp-170": {
    "chapterEn": "Book II Chapter V - Crimes Against Public Order",
    "officialTextEn": "(1) Any person who openly and jointly uses force against persons or property, shall be punished with a maximum imprisonment of five years and six months. (2) The guilty party shall be punished: 1. with a maximum imprisonment of seven years, if they deliberately destroy property or if the force used results in injuries; 2. with a maximum imprisonment of nine years, if the force results in severe injuries; 3. with a maximum imprisonment of twelve years, if the force results in death.",
    "explanationEn": "This article is commonly referred to as the crime of mob violence (pengeroyokan). The key point is 'joint force' or the togetherness of perpetrators (minimum 2 persons or more), in public, physically committing violence against a person or destroying property. The punishment becomes more severe in line with the level of injury or even death of the victim."
  },
  "kuhp-289": {
    "chapterEn": "Book II Chapter XIV - Crimes Against Decency",
    "officialTextEn": "Any person who by force or threat of force compels someone to commit or endure obscene acts, shall be punished for committing acts attacking moral decency, with a maximum imprisonment of nine years.",
    "explanationEn": "This article is about molestation. 'Obscene act' is interpreted as any act that violates the sense of decency (sexual lust), such as groping, forcibly kissing, etc. Unlike Article 285 which implies intercourse, Article 289 covers harassment more broadly as long as there is an element of force or threat of force."
  },
  "kuhp-310": {
    "chapterEn": "Book II Chapter XVI - Insult",
    "officialTextEn": "(1) Any person who deliberately attacks the honor or reputation of someone by accusing them of something, with the clear intention of making it publicly known, shall be punished for defamation with a maximum imprisonment of nine months or a maximum fine of four thousand five hundred rupiahs. (2) If this is done in writing or with pictures broadcast, shown, or posted in public, they shall be punished for written defamation with a maximum imprisonment of one year and four months or a maximum fine of four thousand five hundred rupiahs.",
    "explanationEn": "This is the legal basis for cases of insult and defamation. The main element is accusing someone of a certain act (false facts) with the intent for the public to know so that the victim's reputation is defamed. Paragraph 2 speaks about the written version of this slander (which is currently also relevant and linked to the ITE Law if in the electronic realm)."
  },
  "kuhp-406": {
    "chapterEn": "Book II Chapter XXVII - Destroying or Damaging Property",
    "officialTextEn": "(1) Any person who deliberately and unlawfully destroys, damages, renders unusable or causes the loss of any property which belongs wholly or partly to another person, shall be punished with a maximum imprisonment of two years and eight months or a maximum fine of four thousand five hundred rupiahs. (2) The same punishment shall be imposed on anyone who deliberately and unlawfully kills, damages, renders unusable or causes the loss of an animal, which belongs wholly or partly to another person.",
    "explanationEn": "The article on property destruction. In essence, if someone intentionally (with intent) and unlawfully (has no authority over the property) causes an item to malfunction, become defective, destroyed, or lost. The object can be inanimate objects or pets (living things)."
  },
  "kuhp-55": {
    "chapterEn": "Book I Chapter V - Participation in Criminal Acts",
    "officialTextEn": "(1) Punished as perpetrators of a criminal act are: 1. those who commit, who order to commit, and who participate in committing the act; 2. those who by giving or promising something by abusing power or dignity, by force, threat or deception, or by providing the opportunity, means or information, deliberately urge others to commit the act. (2) In respect of the instigator, only those acts which have been deliberately instigated shall be taken into account, together with their consequences.",
    "explanationEn": "This article regulates the principle of 'Deelneming' (Participation). When a crime is committed by more than one person, the law determines the role of each perpetrator. There is a 'pleger' (direct perpetrator), 'doen pleger' (who orders), 'medepleger' (co-perpetrator), and 'uitlokker' (instigator). They are threatened with punishment as primary perpetrators."
  },
  "kuhp-56": {
    "chapterEn": "Book I Chapter V - Participation in Criminal Acts",
    "officialTextEn": "Punished as accomplices to a crime: 1. those who deliberately provide assistance at the time the crime is committed; 2. those who deliberately provide the opportunity, means or information to commit the crime.",
    "explanationEn": "This article is regarding 'Medeplichtigheid' or complicity. A person is an accomplice if their role only supports the main act (perpetrator). Assistance can occur while the crime is ongoing (such as keeping watch), or before the crime (such as providing a padlock key). The punishment for an accomplice is usually reduced by a third from the maximum punishment of the main perpetrator (Article 57 of the Criminal Code)."
  },
  "kuhp-359": {
    "chapterEn": "Book II Chapter XXI - Causing Death or Injury by Negligence",
    "officialTextEn": "Any person whose fault (negligence) causes the death of another person shall be punished with a maximum imprisonment of five years or a maximum confinement of one year.",
    "explanationEn": "This is a form of negligence offense (culpa). Unlike intentional murder, this article is applied when there is no intent to kill, but rather solely due to negligence, carelessness, or recklessness of the perpetrator, which unfortunately leads to the death of another person. For example, a traffic accident caused by drowsiness."
  },
  "kuhp-360": {
    "chapterEn": "Book II Chapter XXI - Causing Death or Injury by Negligence",
    "officialTextEn": "(1) Any person whose fault (negligence) causes another person to suffer severe injuries shall be punished with a maximum imprisonment of five years or a maximum confinement of one year. (2) Any person whose fault (negligence) causes another person injuries such that illness arises or it hinders them from performing their official duties or profession for a certain period, shall be punished with a maximum imprisonment of nine months or a maximum confinement of six months or a maximum fine of four thousand five hundred rupiahs.",
    "explanationEn": "Similar to Article 359 which regulates negligence, but the consequence is not death but rather severe physical injury or temporary illness that prevents the victim from performing their daily activities."
  },
  "kuhp-365": {
    "chapterEn": "Book II Chapter XXII - Theft",
    "officialTextEn": "(1) Theft preceded, accompanied or followed by force or threat of force, against persons with the intent to prepare or facilitate the theft, or in the case of being caught in the act, to enable oneself or other participants to escape, or to retain control of the stolen property, shall be punished with a maximum imprisonment of nine years. (2) Punished with a maximum imprisonment of twelve years: 1. if the act is committed at night in a house or closed yard where there is a house, on a public road, or in a moving train or tram; 2. if the act is committed by two or more people jointly; 3. if entering the place to commit the crime by breaking or climbing or by using false keys, false orders or false official uniforms; 4. if the act results in severe injuries. (3) If the act results in death, it shall be punished with a maximum imprisonment of fifteen years. (4) Punished with death penalty or life imprisonment or a temporary period of a maximum of twenty years, if the act results in severe injury or death and is committed by two or more people jointly, accompanied by one of the circumstances described in nos. 1 and 3.",
    "explanationEn": "This is the article for theft with violence (often known as robbery or mugging). This violence can occur at the beginning, simultaneously, or at the end of the act as long as the purpose is to smooth the action of taking control of the property. Punishments are tiered according to modus operandi and consequences, reaching the death penalty in paragraph 4."
  },
  "kuhp-368": {
    "chapterEn": "Book II Chapter XXIII - Extortion and Threat",
    "officialTextEn": "(1) Any person who with the intent to unlawfully benefit himself or another person, forces someone with violence or threat of violence to give up any property, which belongs wholly or partly to that person or another person, or to incur a debt or renounce a claim, shall be punished for extortion, with a maximum imprisonment of nine years. (2) The provisions of Article 365 paragraphs (2), (3), and (4) shall apply to this crime.",
    "explanationEn": "The crime of extortion (Afpersing). Unlike theft with violence, here the perpetrator exerts psychological/physical pressure or force in such a way that the victim is ultimately forced to hand over their wealth or property to the perpetrator out of fear of that violence (such as thuggery, extortion)."
  },
  "kuhp-281": {
    "chapterEn": "Book II Chapter XIV - Crimes Against Decency",
    "officialTextEn": "Punished with a maximum imprisonment of two years and eight months or a maximum fine of four thousand five hundred rupiahs: 1. any person who deliberately damages decency in public; 2. any person who deliberately damages decency in front of someone else contrary to that person's will.",
    "explanationEn": "This article regulates the criminal act of damaging decency or public modesty (e.g., exhibitionism, indecent embracing or displaying private parts without right in a place visible to the public). The law does not absolutely define what 'decency' is, but refers it back to the social manners or propriety prevailing in society."
  },
  "kuhp-315": {
    "chapterEn": "Book II Chapter XVI - Insult",
    "officialTextEn": "Every deliberate insult which is not of the nature of defamation or written defamation, committed against a person, whether in public verbally or in writing, or in the presence of that person verbally or by deed, or by a letter sent or delivered to him, shall be punished for minor insult with a maximum imprisonment of four months and two weeks or a maximum fine of four thousand five hundred rupiahs.",
    "explanationEn": "Minor insult (Eenvoudige belediging). The difference from defamation (Article 310) is the absence of an accusation of a specific act being broadcast. This can take the form of foolish swearing, direct insults, or spitting in someone's face directly. The nature of the offense is an absolute complaint offense (the victim must report it)."
  }
}

file_path = "src/lib/pasal-data.ts"
with open(file_path, "r") as f:
    content = f.read()

# Update interface
content = re.sub(
    r"(chapter: string;.*)",
    r"\1\n  chapterEn?: string;",
    content
)
content = re.sub(
    r"(officialText: string;)",
    r"\1\n  officialTextEn?: string;",
    content
)
content = re.sub(
    r"(explanation: string;)",
    r"\1\n  explanationEn?: string;",
    content
)

for id, trans in translations.items():
    chapter_en = json.dumps(trans["chapterEn"])
    official_text_en = json.dumps(trans["officialTextEn"])
    explanation_en = json.dumps(trans["explanationEn"])

    pattern = r'(id:\s*"' + id + r'"[\s\S]*?chapter:\s*".*?",)'
    replacement = r'\1\n    chapterEn: ' + chapter_en + ','
    content = re.sub(pattern, replacement, content, count=1)

    pattern2 = r'(id:\s*"' + id + r'"[\s\S]*?officialText:\s*".*?",)'
    replacement2 = r'\1\n    officialTextEn: ' + official_text_en + ','
    content = re.sub(pattern2, replacement2, content, count=1)

    pattern3 = r'(id:\s*"' + id + r'"[\s\S]*?explanation:\s*".*?",)'
    replacement3 = r'\1\n    explanationEn: ' + explanation_en + ','
    content = re.sub(pattern3, replacement3, content, count=1)

with open(file_path, "w") as f:
    f.write(content)
