import { ExaminationData } from "@shared/schema";

// Original data with all questions
const fullExaminationData: ExaminationData = {
  categories: [
    {
      name: "First Commandment: I am the Lord your God",
      questions: [
        "Have I doubted or denied the existence of God?",
        "Have I failed to pray daily?",
        "Have I despaired of God's mercy?",
        "Have I placed faith in superstition?",
        "Have I engaged in occult practices or consulted fortune tellers?",
        "Have I been involved in the New Age or Eastern mysticism?",
        "Have I abandoned the Catholic faith?",
        "Have I refused to believe Church teachings or denied them?",
        "Have I been negligent in learning my faith?",
        "Have I deliberately doubted or denied a teaching of the Church?"
      ]
    },
    {
      name: "Second Commandment: Do not take the name of the Lord in vain",
      questions: [
        "Have I used God's name carelessly or in anger?",
        "Have I sworn false oaths or made false promises in God's name?",
        "Have I shown disrespect for the Blessed Virgin Mary or the saints?",
        "Have I used profanity, cursed, or taken God's name in vain?",
        "Have I wished evil upon another person?",
        "Have I insulted Church leaders or shown disrespect for sacred objects?"
      ]
    },
    {
      name: "Third Commandment: Keep holy the Sabbath",
      questions: [
        "Have I deliberately missed Mass on Sundays or Holy Days?",
        "Have I not paid attention during Mass?",
        "Have I done unnecessary work on Sunday?",
        "Have I deliberately come late or left early from Mass without a good reason?",
        "Have I received Communion while in a state of mortal sin?",
        "Have I contributed to the support of the Church according to my means?",
        "Have I not kept Sunday as a day of prayer, rest, and relaxation?"
      ]
    },
    {
      name: "Fourth Commandment: Honor your father and mother",
      questions: [
        "Have I disobeyed or disrespected my parents or legitimate authorities?",
        "Have I neglected my duties to my spouse or children?",
        "Have I provided inadequate spiritual care for my family?",
        "Have I failed to care for elderly parents or family members?",
        "Have I shown disrespect for those in authority?",
        "Have I treated employees or those under my authority unjustly?"
      ]
    },
    {
      name: "Fifth Commandment: You shall not kill",
      questions: [
        "Have I caused or intended physical, emotional, or spiritual harm to others?",
        "Have I harbored hatred, anger, or resentment?",
        "Have I had or encouraged an abortion?",
        "Have I supported immoral medical or scientific research?",
        "Have I abused alcohol or drugs?",
        "Have I overindulged in food or neglected my health?",
        "Have I failed to forgive?",
        "Have I been verbally or physically abusive to others?",
        "Have I encouraged gossip or spread rumors about others?"
      ]
    },
    {
      name: "Sixth & Ninth Commandments: You shall not commit adultery/covet your neighbor's spouse",
      questions: [
        "Have I committed adultery or been unfaithful to my spouse?",
        "Have I viewed pornography or deliberately entertained impure thoughts?",
        "Have I dressed immodestly?",
        "Have I consented to impure desires?",
        "Have I engaged in premarital sex or artificial contraception?",
        "Have I used impure or suggestive language?",
        "Have I engaged in solitary lust or self-abuse (masturbation)?"
      ]
    },
    {
      name: "Seventh & Tenth Commandments: You shall not steal/covet your neighbor's goods",
      questions: [
        "Have I stolen or damaged another's property?",
        "Have I been dishonest in business or work?",
        "Have I wasted time or resources at work?",
        "Have I cheated on my taxes?",
        "Have I failed to make reparation for theft or damage done to others?",
        "Have I been greedy or materialistic?",
        "Have I failed to give to the poor according to my means?",
        "Have I been envious of others' possessions, talents, or successes?"
      ]
    },
    {
      name: "Eighth Commandment: You shall not bear false witness",
      questions: [
        "Have I lied or exaggerated the truth?",
        "Have I gossiped or revealed others' faults without serious reason?",
        "Have I been uncharitable in speech about others?",
        "Have I engaged in rash judgment?",
        "Have I committed perjury or encouraged others to lie?",
        "Have I failed to defend the reputation of others?",
        "Have I betrayed others' trust or shared confidences without permission?"
      ]
    },
    {
      name: "Precepts of the Church",
      questions: [
        "Have I deliberately neglected my Easter duty to receive Holy Communion?",
        "Have I failed to observe the prescribed days of fasting and abstinence?",
        "Have I failed to confess my serious sins at least once a year?",
        "Have I supported the Church financially according to my means?",
        "Have I ignored the Church's marriage laws or encouraged others to do so?"
      ]
    },
    {
      name: "The Seven Deadly Sins",
      questions: [
        "Pride: Have I been arrogant or self-centered?",
        "Greed: Have I been overly focused on material possessions?",
        "Lust: Have I indulged in impure thoughts or actions?",
        "Anger: Have I lost my temper or acted on anger?",
        "Gluttony: Have I overindulged in food, drink or entertainment?",
        "Envy: Have I been jealous of others' possessions, talents, or successes?",
        "Sloth: Have I been lazy in my spiritual life or duties?"
      ]
    }
  ]
};

// Create a shortened version with only 20 key questions
export const examinationData: ExaminationData = {
  categories: [
    {
      name: "First and Second Commandments",
      questions: [
        "Have I doubted or denied the existence of God?",
        "Have I failed to pray daily?",
        "Have I used God's name carelessly or in anger?",
        "Have I engaged in occult practices or shown disrespect for sacred things?"
      ]
    },
    {
      name: "Third and Fourth Commandments",
      questions: [
        "Have I deliberately missed Mass on Sundays or Holy Days?",
        "Have I not kept Sunday as a day of prayer and rest?",
        "Have I disobeyed or disrespected my parents or legitimate authorities?",
        "Have I neglected my duties to my spouse or children?"
      ]
    },
    {
      name: "Fifth Commandment",
      questions: [
        "Have I caused harm to others physically, emotionally, or spiritually?",
        "Have I harbored hatred, anger, or failed to forgive others?",
        "Have I abused alcohol, drugs, or neglected my health?"
      ]
    },
    {
      name: "Sixth and Ninth Commandments",
      questions: [
        "Have I been unfaithful to my spouse in thought or action?",
        "Have I viewed pornography or entertained impure thoughts?",
        "Have I engaged in sexual activity outside of marriage?"
      ]
    },
    {
      name: "Seventh, Eighth, and Tenth Commandments",
      questions: [
        "Have I stolen, damaged property, or been dishonest in business?",
        "Have I lied, gossiped, or damaged another's reputation?",
        "Have I been envious of others' possessions, talents, or success?",
        "Have I failed to give to the poor according to my means?"
      ]
    },
    {
      name: "The Seven Deadly Sins",
      questions: [
        "Pride: Have I been arrogant or self-centered?",
        "Lust: Have I indulged in impure thoughts or actions?",
        "Sloth: Have I been lazy in my spiritual life or duties?"
      ]
    }
  ]
};
