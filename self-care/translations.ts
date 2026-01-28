
import { useLanguage } from './contexts/LanguageContext';
import type { LanguageCode } from './types';

export interface Translations {
    // App.tsx
    idleTitle: string;
    idleWelcome: string;
    idleDescription: string;
    idleInstructions: string;
    startQuizButton: string;
    emailPrompt: string;
    activeTitle: string;
    submitButton: string;
    pleaseAnswerAll: string;
    errorTitle: string;
    analysisError: string;
    tryAgainButton: string;
    footerText: string;
    // LoadingSpinner.tsx
    loadingAnalysis: string;
    loadingTakeAMoment: string;
    // ResultsDisplay.tsx
    userEmail: string;
    resultsTitle: string;
    resultsSubtitle: string;
    summaryTitle: string;
    scoresOverviewTitle: string;
    resetQuizButton: string;
    score: string;
    woundName: string;
    privacyInfo: string;
    topWoundsTitle: string;
    primaryWoundTitle: string;
    secondaryWoundTitle: string;
    categoriesTitle: string;
    regulatedTitle: string;
    regulatedDescription: string;
    compensatedTitle: string;
    compensatedDescription: string;
    overwhelmedTitle: string;
    overwhelmedDescription: string;
    woundDistributionTitle: string;
    detailedBreakdownTitle: string;
    totalScoreTitle: string;
    totalScore: string;
    regulatedMainTitle: string;
    regulatedMainDescription: string;
    compensatedMainTitle: string;
    compensatedLowDescription: string;
    compensatedHighDescription: string;
    overwhelmedMainTitle: string;
    overwhelmedMainDescription: string;
    recommendationTitle: string;
    recommendationLowScore: string;
    recommendationHighScore: string;
    sendToHorizontenButton: string;
    emailSubject: string;
    copyButton: string;
    copiedButton: string;
    nextSurveyButton: string;
    // Wound Tooltips
    woundTooltip_O: string;
    woundTooltip_A: string;
    woundTooltip_F: string;
    woundTooltip_S: string;
    woundTooltip_R: string;
    woundTooltip_E: string;
}

const translations: Record<LanguageCode, Translations> = {
    sv: {
        idleTitle: "Enkät: Grundsår för Självreflektion",
        idleWelcome: "Välkommen till en resa inåt. Detta verktyg är utformat för att hjälpa dig reflektera över dina så kallade <strong>Grundsår</strong>.",
        idleDescription: "Den korrekta psykologiska termen är <strong>Kumulativa stress- och utvecklingstrauma (KUT)</strong>. Till skillnad från enstaka, chockerande händelser (PTSD), uppstår KUT från upprepade och ofta subtila negativa upplevelser över tid, särskilt under uppväxten. Det kan handla om allt från känslomässig försummelse och konstant kritik till en oförutsägbar hemmiljö. Eftersom dessa erfarenheter normaliseras blir de en del av vår 'normala' verklighet och kan forma vår självbild, våra relationer och hur vi ser på världen. Långsiktiga effekter kan inkludera låg självkänsla, svårigheter med tillit, och en ihållande känsla av att inte duga.",
        idleInstructions: "Se denna enkät som ett första steg i din självreflektion. Svara ärligt utifrån vad som känns mest sant för dig. När du är klar analyseras dina svar för att ge dig en personlig insikt. All information hanteras enligt vår <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>integritets- och sekretesspolicy</a>.",
        startQuizButton: "Starta Enkäten",
        emailPrompt: "Ange din e-postadress för att fortsätta",
        activeTitle: "Självreflektionsenkät",
        submitButton: "Skicka in och se resultat",
        pleaseAnswerAll: "Vänligen besvara alla frågor för att fortsätta.",
        errorTitle: "Ett fel har inträffat",
        analysisError: "Ett fel uppstod vid analysen. Försök igen.",
        tryAgainButton: "Försök igen",
        footerText: "Copyright © Klätterträdet 2024",
        loadingAnalysis: "Analyserar dina svar...",
        loadingTakeAMoment: "Detta kan ta en liten stund.",
        userEmail: "Användarens e-post",
        resultsTitle: "Ditt Resultat",
        resultsSubtitle: "Här är en analys av dina svar, utformad för att stödja din självreflektion.",
        summaryTitle: "Sammanfattande Analys",
        scoresOverviewTitle: "Poängöversikt",
        resetQuizButton: "Gör om enkäten",
        score: "Poäng",
        woundName: "Grundsår",
        privacyInfo: "Din integritet är viktig för oss. All analys av dina svar sker anonymt och direkt i din webbläsare. Ingen personlig data eller enskilda svar sparas på våra servrar. För en fullständig beskrivning, läs vår <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>integritets- och sekretesspolicy</a>.",
        topWoundsTitle: "Dina mest framträdande grundsår",
        primaryWoundTitle: "Primärt grundsår",
        secondaryWoundTitle: "Sekundärt grundsår",
        categoriesTitle: "Förstå din påverkansgrad per sår",
        regulatedTitle: "Reglerat",
        regulatedDescription: "Indikerar att detta område har en låg inverkan på ditt dagliga liv. Du har troligen sunda hanteringsstrategier.",
        compensatedTitle: "Kompenserat",
        compensatedDescription: "Tyder på att du kan uppleva utmaningar, men har utvecklat strategier för att hantera dem, vilket kan vara energikrävande.",
        overwhelmedTitle: "Överväldigat",
        overwhelmedDescription: "Indikerar att detta område har en betydande inverkan på dina tankar, känslor och beteenden. Stöd kan vara värdefullt här.",
        woundDistributionTitle: "Fördelning av Grundsår",
        detailedBreakdownTitle: "Detaljerad översikt",
        totalScoreTitle: "Din totala påverkansgrad",
        totalScore: "Totalpoäng",
        regulatedMainTitle: "Reglerat (0-49 poäng)",
        regulatedMainDescription: "Din totalpoäng indikerar en stark förmåga till självreglering och en hög grad av emotionell medvetenhet. Du har sannolikt en stabil grund och har utvecklat sunda, effektiva strategier för att hantera livets utmaningar. Detta tyder på resiliens, en trygg inre kärna och en hälsosam koppling till dina känslor, vilket gör att du kan navigera svårigheter på ett balanserat och konstruktivt sätt. Även om vissa sår kan finnas, påverkar de inte din vardag i någon större utsträckning.",
        compensatedMainTitle: "Kompenserat (50-79 poäng)",
        compensatedLowDescription: "Din totalpoäng antyder att du befinner dig i ett kompenserat läge, där du aktivt hanterar underliggande sår. Du har utvecklat fungerande försvarsmekanismer, men dessa kan vara energikrävande och ibland leda till stress eller utmattning. Det finns en medvetenhet, men också en sårbarhet.",
        compensatedHighDescription: "Din totalpoäng antyder att du befinner dig i ett kompenserat läge, men med en högre ansträngning. Du arbetar hårt för att hantera dina sår, vilket kan leda till en känsla av att ständigt vara på din vakt. Du kan uppleva perioder av stress och trötthet, och det finns en risk att dina strategier blir överbelastade under press.",
        overwhelmedMainTitle: "Överväldigat (80-120 poäng)",
        overwhelmedMainDescription: "Din totalpoäng indikerar att dina grundsår har en betydande och märkbar inverkan på ditt dagliga liv. Du kan uppleva intensiva känslor, återkommande negativa tankemönster och svårigheter i relationer. Dina vanliga hanteringsstrategier kan kännas otillräckliga, och du kan känna dig fast eller överväldigad. Detta är en tydlig signal om att det är dags att söka stöd för att bearbeta dessa sår och hitta nya, mer hållbara vägar framåt.",
        recommendationTitle: "Rekommendation & Nästa Steg",
        recommendationLowScore: "Ditt resultat tyder på en god grund av självinsikt och resiliens. Fortsätt att vårda din emotionella hälsa genom självreflektion. Om något specifikt sår ändå resonerar med dig, kan det vara värdefullt att utforska det vidare på egen hand eller med en vän.",
        recommendationHighScore: "Ditt resultat indikerar att du bär på en betydande emotionell smärta som påverkar ditt välmående. Att söka professionellt stöd från en terapeut eller psykolog kan vara ett avgörande steg mot läkning. På <a href='https://www.klattertradet.se' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>Klätterträdet</a> erbjuder vi specialiserad hjälp för att bearbeta KUT. Kontakta oss gärna för ett första samtal.",
        sendToHorizontenButton: "Skicka till Horizonten",
        emailSubject: "Resultat från Grundsårsenkäten",
        copyButton: "Kopiera text",
        copiedButton: "Kopierad!",
        nextSurveyButton: "Gå vidare till enkät 2: Kompenserat",
        woundTooltip_O: "Övergivenhet: Rädslan för att bli lämnad, fysiskt eller emotionellt.",
        woundTooltip_A: "Avvisad: Känslan av att inte duga, inte höra till eller vara oönskad.",
        woundTooltip_F: "Förödmjukad: Känslan av skam, att vara liten, fel eller värdelös.",
        woundTooltip_S: "Sviken: Rädslan för att bli bedragen, vilket leder till misstro.",
        woundTooltip_R: "Orättvisa: Känslan av att livet är orättvist och att man behandlas fel.",
        woundTooltip_E: "Ensamhet: En djup inre känsla av att vara ensam, oavsett sällskap."
    },
    en: {
        idleTitle: "Survey: Core Wounds for Self-Reflection",
        idleWelcome: "Welcome to a journey inward. This tool is designed to help you reflect on your so-called <strong>Core Wounds</strong>.",
        idleDescription: "The correct psychological term is <strong>Cumulative Stress and Developmental Trauma (CSDT)</strong>. Unlike single, shocking events (PTSD), CSDT arises from repeated and often subtle negative experiences over time, especially during childhood. This can range from emotional neglect and constant criticism to an unpredictable home environment. Because these experiences are normalized, they become part of our 'normal' reality and can shape our self-image, our relationships, and how we see the world. Long-term effects can include low self-esteem, difficulty with trust, and a persistent feeling of not being good enough.",
        idleInstructions: "See this survey as a first step in your self-reflection. Answer honestly based on what feels most true for you. When you are finished, your answers will be analyzed to give you personal insight. All information is handled according to our <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>privacy policy</a>.",
        startQuizButton: "Start Survey",
        emailPrompt: "Enter your email address to continue",
        activeTitle: "Self-Reflection Survey",
        submitButton: "Submit and See Results",
        pleaseAnswerAll: "Please answer all questions to continue.",
        errorTitle: "An error has occurred",
        analysisError: "An error occurred during the analysis. Please try again.",
        tryAgainButton: "Try Again",
        footerText: "Copyright © Klätterträdet 2024",
        loadingAnalysis: "Analyzing your answers...",
        loadingTakeAMoment: "This may take a moment.",
        userEmail: "User's email",
        resultsTitle: "Your Result",
        resultsSubtitle: "Here is an analysis of your answers, designed to support your self-reflection.",
        summaryTitle: "Summary Analysis",
        scoresOverviewTitle: "Score Overview",
        resetQuizButton: "Retake Survey",
        score: "Score",
        woundName: "Core Wound",
        privacyInfo: "Your privacy is important to us. All analysis of your answers is done anonymously and directly in your browser. No personal data or individual answers are saved on our servers. For a full description, please read our <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>privacy policy</a>.",
        topWoundsTitle: "Your Most Prominent Core Wounds",
        primaryWoundTitle: "Primary Core Wound",
        secondaryWoundTitle: "Secondary Core Wound",
        categoriesTitle: "Understand Your Impact Level Per Wound",
        regulatedTitle: "Regulated",
        regulatedDescription: "Indicates that this area has a low impact on your daily life. You likely have healthy coping strategies.",
        compensatedTitle: "Compensated",
        compensatedDescription: "Suggests you may experience challenges but have developed strategies to manage them, which can be energy-consuming.",
        overwhelmedTitle: "Overwhelmed",
        overwhelmedDescription: "Indicates this area has a significant impact on your thoughts, feelings, and behaviors. Support could be valuable here.",
        woundDistributionTitle: "Core Wound Distribution",
        detailedBreakdownTitle: "Detailed Breakdown",
        totalScoreTitle: "Your Total Impact Level",
        totalScore: "Total Score",
        regulatedMainTitle: "Regulated (0-49 points)",
        regulatedMainDescription: "Your total score indicates a strong ability for self-regulation and a high degree of emotional awareness. You likely have a stable foundation and have developed healthy, effective strategies to handle life's challenges. This suggests resilience, a secure inner core, and a healthy connection to your emotions, allowing you to navigate difficulties in a balanced and constructive way. Although some wounds may be present, they do not significantly affect your daily life.",
        compensatedMainTitle: "Compensated (50-79 points)",
        compensatedLowDescription: "Your total score suggests that you are in a compensated state, actively managing underlying wounds. You have developed functional defense mechanisms, but these can be energy-consuming and sometimes lead to stress or exhaustion. There is an awareness, but also a vulnerability.",
        compensatedHighDescription: "Your total score suggests that you are in a compensated state, but with greater effort. You work hard to manage your wounds, which can lead to a feeling of constantly being on guard. You may experience periods of stress and fatigue, and there is a risk that your strategies will become overloaded under pressure.",
        overwhelmedMainTitle: "Overwhelmed (80-120 points)",
        overwhelmedMainDescription: "Your total score indicates that your core wounds have a significant and noticeable impact on your daily life. You may experience intense emotions, recurring negative thought patterns, and difficulties in relationships. Your usual coping strategies may feel inadequate, and you might feel stuck or overwhelmed. This is a clear signal that it is time to seek support to process these wounds and find new, more sustainable paths forward.",
        recommendationTitle: "Recommendation & Next Steps",
        recommendationLowScore: "Your result suggests a good foundation of self-awareness and resilience. Continue to nurture your emotional health through self-reflection. If a specific wound still resonates with you, it may be valuable to explore it further on your own or with a friend.",
        recommendationHighScore: "Your result indicates that you carry significant emotional pain that affects your well-being. Seeking professional support from a therapist or psychologist can be a crucial step towards healing. At <a href='https://www.klattertradet.se' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>Klätterträdet</a>, we offer specialized help for processing CSDT. Please contact us for an initial consultation.",
        sendToHorizontenButton: "Send to Horizonten",
        emailSubject: "Results from the Core Wounds Survey",
        copyButton: "Copy Text",
        copiedButton: "Copied!",
        nextSurveyButton: "Proceed to Survey 2: Compensated",
        woundTooltip_O: "Abandonment: The fear of being left, physically or emotionally.",
        woundTooltip_A: "Rejection: The feeling of not being good enough, not belonging, or being unwanted.",
        woundTooltip_F: "Humiliation: The feeling of shame, of being small, wrong, or worthless.",
        woundTooltip_S: "Betrayal: The fear of being deceived, leading to mistrust.",
        woundTooltip_R: "Injustice: The feeling that life is unfair and that one is treated wrongly.",
        woundTooltip_E: "Loneliness: A deep inner feeling of being alone, regardless of company."
    },
    ar: {
        idleTitle: "استبيان: الجروح الأساسية للتأمل الذاتي",
        idleWelcome: "مرحبًا بك في رحلة إلى الداخل. تم تصميم هذه الأداة لمساعدتك على التفكير في ما يسمى <strong>بالجروح الأساسية</strong>.",
        idleDescription: "المصطلح النفسي الصحيح هو <strong>الصدمة التراكمية النمائية والتوتر (CSDT)</strong>. على عكس الأحداث الصادمة المفردة (PTSD) ، تنشأ CSDT من تجارب سلبية متكررة وغالبًا ما تكون خفية بمرور الوقت ، خاصة أثناء الطفولة. يمكن أن يتراوح هذا من الإهمال العاطفي والنقد المستمر إلى بيئة منزلية لا يمكن التنبؤ بها. نظرًا لأن هذه التجارب يتم تطبيعها ، فإنها تصبح جزءًا من واقعنا 'الطبيعي' ويمكن أن تشكل صورتنا الذاتية وعلاقاتنا وكيف نرى العالم. يمكن أن تشمل الآثار طويلة المدى تدني احترام الذات ، وصعوبة الثقة ، والشعور المستمر بعدم الكفاءة.",
        idleInstructions: "اعتبر هذا الاستبيان كخطوة أولى في تأملك الذاتي. أجب بصدق بناءً على ما تشعر أنه الأكثر صحة بالنسبة لك. عند الانتهاء ، سيتم تحليل إجاباتك لمنحك رؤية شخصية. يتم التعامل مع جميع المعلومات وفقًا <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>لسياسة الخصوصية</a> الخاصة بنا.",
        startQuizButton: "ابدأ الاستبيان",
        emailPrompt: "أدخل بريدك الإلكتروني للمتابعة",
        activeTitle: "استبيان التأمل الذاتي",
        submitButton: "إرسال ورؤية النتائج",
        pleaseAnswerAll: "يرجى الإجابة على جميع الأسئلة للمتابعة.",
        errorTitle: "حدث خطأ",
        analysisError: "حدث خطأ أثناء التحليل. يرجى المحاولة مرة أخرى.",
        tryAgainButton: "حاول مرة أخرى",
        footerText: "حقوق النشر © Klätterträdet 2024",
        loadingAnalysis: "جاري تحليل إجاباتك...",
        loadingTakeAMoment: "قد يستغرق هذا بعض الوقت.",
        userEmail: "بريد المستخدم الإلكتروني",
        resultsTitle: "نتيجتك",
        resultsSubtitle: "إليك تحليل لإجاباتك ، مصمم لدعم تأملك الذاتي.",
        summaryTitle: "تحليل موجز",
        scoresOverviewTitle: "نظرة عامة على النتائج",
        resetQuizButton: "إعادة الاستبيان",
        score: "النتيجة",
        woundName: "الجرح الأساسي",
        privacyInfo: "خصوصيتك تهمنا. يتم كل تحليل لإجاباتك بشكل مجهول ومباشرة في متصفحك. لا يتم حفظ أي بيانات شخصية أو إجابات فردية على خوادمنا. للحصول على وصف كامل ، يرجى قراءة <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>سياسة الخصوصية</a> الخاصة بنا.",
        topWoundsTitle: "أبرز جروحك الأساسية",
        primaryWoundTitle: "الجرح الأساسي الأولي",
        secondaryWoundTitle: "الجرح الأساسي الثانوي",
        categoriesTitle: "افهم مستوى تأثير كل جرح",
        regulatedTitle: "منظم",
        regulatedDescription: "يشير إلى أن هذا المجال له تأثير منخفض على حياتك اليومية. من المحتمل أن يكون لديك استراتيجيات تأقلم صحية.",
        compensatedTitle: "معوض",
        compensatedDescription: "يشير إلى أنك قد تواجه تحديات ولكنك طورت استراتيجيات لإدارتها ، والتي يمكن أن تكون مستهلكة للطاقة.",
        overwhelmedTitle: "غارق",
        overwhelmedDescription: "يشير إلى أن هذا المجال له تأثير كبير على أفكارك ومشاعرك وسلوكياتك. قد يكون الدعم ذا قيمة هنا.",
        woundDistributionTitle: "توزيع الجروح الأساسية",
        detailedBreakdownTitle: "تفصيل مفصل",
        totalScoreTitle: "مستوى التأثير الإجمالي الخاص بك",
        totalScore: "النتيجة الإجمالية",
        regulatedMainTitle: "منظم (0-49 نقطة)",
        regulatedMainDescription: "تشير نتيجتك الإجمالية إلى قدرة قوية على التنظيم الذاتي ودرجة عالية من الوعي العاطفي. من المحتمل أن يكون لديك أساس مستقر وقد طورت استراتيجيات صحية وفعالة للتعامل مع تحديات الحياة. يشير هذا إلى المرونة ، وجوهر داخلي آمن ، واتصال صحي بمشاعرك ، مما يسمح لك بالتنقل في الصعوبات بطريقة متوازنة وبناءة. على الرغم من وجود بعض الجروح ، إلا أنها لا تؤثر بشكل كبير على حياتك اليومية.",
        compensatedMainTitle: "معوض (50-79 نقطة)",
        compensatedLowDescription: "تشير نتيجتك الإجمالية إلى أنك في حالة معوضة ، وتدير بنشاط الجروح الكامنة. لقد طورت آليات دفاع وظيفية ، ولكنها يمكن أن تكون مستهلكة للطاقة وتؤدي أحيانًا إلى التوتر أو الإرهاق. هناك وعي ، ولكن هناك أيضًا ضعف.",
        compensatedHighDescription: "تشير نتيجتك الإجمالية إلى أنك في حالة معوضة ، ولكن بجهد أكبر. أنت تعمل بجد لإدارة جروحك ، مما قد يؤدي إلى الشعور باليقظة المستمرة. قد تواجه فترات من التوتر والتعب ، وهناك خطر من أن تصبح استراتيجياتك مثقلة تحت الضغط.",
        overwhelmedMainTitle: "غارق (80-120 نقطة)",
        overwhelmedMainDescription: "تشير نتيجتك الإجمالية إلى أن جروحك الأساسية لها تأثير كبير وملحوظ على حياتك اليومية. قد تواجه مشاعر شديدة ، وأنماط تفكير سلبية متكررة ، وصعوبات في العلاقات. قد تشعر أن استراتيجيات التأقلم المعتادة لديك غير كافية ، وقد تشعر بأنك عالق أو غارق. هذه إشارة واضحة على أن الوقت قد حان لطلب الدعم لمعالجة هذه الجروح وإيجاد مسارات جديدة أكثر استدامة للمضي قدمًا.",
        recommendationTitle: "توصية وخطوات تالية",
        recommendationLowScore: "تشير نتيجتك إلى أساس جيد من الوعي الذاتي والمرونة. استمر في رعاية صحتك العاطفية من خلال التأمل الذاتي. إذا كان جرح معين لا يزال يتردد صداه معك ، فقد يكون من المفيد استكشافه بشكل أكبر بنفسك أو مع صديق.",
        recommendationHighScore: "تشير نتيجتك إلى أنك تحمل ألمًا عاطفيًا كبيرًا يؤثر على صحتك. يمكن أن يكون طلب الدعم المهني من معالج أو طبيب نفسي خطوة حاسمة نحو الشفاء. في <a href='https://www.klattertradet.se' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>Klätterträdet</a> ، نقدم مساعدة متخصصة لمعالجة CSDT. يرجى الاتصال بنا للحصول على استشارة أولية.",
        sendToHorizontenButton: "أرسل إلى Horizonten",
        emailSubject: "نتائج من استبيان الجروح الأساسية",
        copyButton: "نسخ النص",
        copiedButton: "تم النسخ!",
        nextSurveyButton: "انتقل إلى الاستبيان 2: معوض",
        woundTooltip_O: "الهجر: الخوف من أن تُترك ، جسديًا أو عاطفيًا.",
        woundTooltip_A: "الرفض: الشعور بعدم الكفاءة ، أو عدم الانتماء ، أو عدم الرغبة.",
        woundTooltip_F: "الإذلال: الشعور بالخزي ، أو الصغر ، أو الخطأ ، أو عدم القيمة.",
        woundTooltip_S: "الخيانة: الخوف من الخداع ، مما يؤدي إلى عدم الثقة.",
        woundTooltip_R: "الظلم: الشعور بأن الحياة غير عادلة وأن المرء يُعامل بشكل خاطئ.",
        woundTooltip_E: "الوحدة: شعور داخلي عميق بالوحدة ، بغض النظر عن الرفقة."
    },
    fi: {
        idleTitle: "Kysely: Ydinhaavat itsetutkiskelua varten",
        idleWelcome: "Välkomna matkalle sisäänpäin. Tämä työkalu on suunniteltu auttamaan sinua pohtimaan niin kutsuttuja <strong>ydinhaavojasi</strong>.",
        idleDescription: "Oikea psykologinen termi on <strong>kumulatiivinen stressi ja kehityksellinen trauma (CSDT)</strong>. Toisin kuin yksittäiset, järkyttävät tapahtumat (PTSD), CSDT syntyy toistuvista ja usein hienovaraisista negatiivisista kokemuksista ajan myötä, erityisesti lapsuudessa. Tämä voi vaihdella emotionaalisesta laiminlyönnistä ja jatkuvasta kritiikistä arvaamattomaan kotiympäristöön. Koska nämä kokemukset normalisoituvat, niistä tulee osa 'normaalia' todellisuuttamme ja ne voivat muokata minäkuvaamme, suhteitamme ja tapaamme nähdä maailma. Pitkäaikaisia vaikutuksia voivat olla alhainen itsetunto, luottamusvaikeudet ja jatkuva riittämättömyyden tunne.",
        idleInstructions: "Näe tämä kysely ensimmäisenä askeleena itsetutkiskelussasi. Vastaa rehellisesti sen perusteella, mikä tuntuu sinulle todelta. Kun olet valmis, vastauksesi analysoidaan antamaan sinulle henkilökohtaista oivallusta. Kaikki tiedot käsitellään <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>tietosuojakäytäntömme</a> mukaisesti.",
        startQuizButton: "Aloita kysely",
        emailPrompt: "Syötä sähköpostiosoitteesi jatkaaksesi",
        activeTitle: "Itsetutkiskelukysely",
        submitButton: "Lähetä ja katso tulokset",
        pleaseAnswerAll: "Vastaa kaikkiin kysymyksiin jatkaaksesi.",
        errorTitle: "On tapahtunut virhe",
        analysisError: "Analyysin aikana tapahtui virhe. Yritä uudelleen.",
        tryAgainButton: "Yritä uudelleen",
        footerText: "Tekijänoikeus © Klätterträdet 2024",
        loadingAnalysis: "Analysoidaan vastauksiasi...",
        loadingTakeAMoment: "Tämä voi kestää hetken.",
        userEmail: "Käyttäjän sähköposti",
        resultsTitle: "Tuloksesi",
        resultsSubtitle: "Tässä on analyysi vastauksistasi, joka on suunniteltu tukemaan itsetutkiskeluasi.",
        summaryTitle: "Yhteenvetoanalyysi",
        scoresOverviewTitle: "Pisteiden yleiskatsaus",
        resetQuizButton: "Tee kysely uudelleen",
        score: "Pisteet",
        woundName: "Ydinhaava",
        privacyInfo: "Yksityisyytesi on meille tärkeää. Kaikki vastaustesi analysointi tapahtuu nimettömänä ja suoraan selaimessasi. Henkilötietoja tai yksittäisiä vastauksia ei tallenneta palvelimillemme. Lue koko kuvaus <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>tietosuojakäytäntömme</a>.",
        topWoundsTitle: "Merkittävimmät ydinhaavasi",
        primaryWoundTitle: "Ensisijainen ydinhaava",
        secondaryWoundTitle: "Toissijainen ydinhaava",
        categoriesTitle: "Ymmärrä vaikutustasosi haavaa kohti",
        regulatedTitle: "Säännelty",
        regulatedDescription: "Osoittaa, että tällä alueella on vähäinen vaikutus päivittäiseen elämääsi. Sinulla on todennäköisesti terveitä selviytymisstrategioita.",
        compensatedTitle: "Kompensoitu",
        compensatedDescription: "Viittaa siihen, että saatat kohdata haasteita, mutta olet kehittänyt strategioita niiden hallitsemiseksi, mikä voi olla energiaa vievää.",
        overwhelmedTitle: "Ylikuormitettu",
        overwhelmedDescription: "Osoittaa, että tällä alueella on merkittävä vaikutus ajatuksiisi, tunteisiisi ja käyttäytymiseesi. Tuki voisi olla arvokasta tässä.",
        woundDistributionTitle: "Ydinhaavojen jakauma",
        detailedBreakdownTitle: "Yksityiskohtainen erittely",
        totalScoreTitle: "Kokonaisvaikutustasosi",
        totalScore: "Kokonaispisteet",
        regulatedMainTitle: "Säännelty (0-49 pistettä)",
        regulatedMainDescription: "Kokonaispisteesi osoittavat vahvaa kykyä itsesäätelyyn ja korkeaa emotionaalista tietoisuutta. Sinulla on todennäköisesti vakaa perusta ja olet kehittänyt terveitä, tehokkaita strategioita elämän haasteiden käsittelemiseksi. Tämä viittaa sietokykyyn, turvalliseen sisäiseen ytimeen ja terveeseen yhteyteen tunteisiisi, mikä antaa sinun selviytyä vaikeuksista tasapainoisella ja rakentavalla tavalla. Vaikka joitain haavoja voi olla, ne eivät vaikuta merkittävästi päivittäiseen elämääsi.",
        compensatedMainTitle: "Kompensoitu (50-79 pistettä)",
        compensatedLowDescription: "Kokonaispisteesi viittaavat siihen, että olet kompensoidussa tilassa, hallitset aktiivisesti taustalla olevia haavoja. Olet kehittänyt toimivia puolustusmekanismeja, mutta ne voivat olla energiaa vieviä ja johtaa joskus stressiin tai uupumukseen. On tietoisuutta, mutta myös haavoittuvuutta.",
        compensatedHighDescription: "Kokonaispisteesi viittaavat siihen, että olet kompensoidussa tilassa, mutta suuremmalla vaivalla. Työskentelet kovasti haavojesi hallitsemiseksi, mikä voi johtaa jatkuvan varuillaan olon tunteeseen. Saatat kokea stressin ja väsymyksen kausia, ja on olemassa riski, että strategiasi ylikuormittuvat paineen alla.",
        overwhelmedMainTitle: "Ylikuormitettu (80-120 pistettä)",
        overwhelmedMainDescription: "Kokonaispisteesi osoittavat, että ydinhaavoillasi on merkittävä ja huomattava vaikutus päivittäiseen elämääsi. Saatat kokea voimakkaita tunteita, toistuvia negatiivisia ajatusmalleja ja vaikeuksia suhteissa. Tavanomaiset selviytymisstrategiasi voivat tuntua riittämättömiltä, ja saatat tuntea itsesi jumiutuneeksi tai ylikuormittuneeksi. Tämä on selvä signaali siitä, että on aika hakea tukea näiden haavojen käsittelemiseksi ja löytää uusia, kestävämpiä polkuja eteenpäin.",
        recommendationTitle: "Suositus ja seuraavat vaiheet",
        recommendationLowScore: "Tuloksesi viittaa hyvään itsetuntemuksen ja sietokyvyn perustaan. Jatka emotionaalisen terveytesi vaalimista itsetutkiskelun kautta. Jos jokin tietty haava silti resonoi kanssasi, voi olla arvokasta tutkia sitä tarkemmin yksin tai ystävän kanssa.",
        recommendationHighScore: "Tuloksesi osoittaa, että kannat merkittävää emotionaalista kipua, joka vaikuttaa hyvinvointiisi. Ammatillisen tuen hakeminen terapeutilta tai psykologilta voi olla ratkaiseva askel kohti paranemista. <a href='https://www.klattertradet.se' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>Klätterträdetissä</a> tarjoamme erikoistunutta apua CSDT:n käsittelyyn. Ota meihin yhteyttä ensikonsultaatiota varten.",
        sendToHorizontenButton: "Lähetä Horizontenille",
        emailSubject: "Tulokset ydinhaavakyselystä",
        copyButton: "Kopioi teksti",
        copiedButton: "Kopioitu!",
        nextSurveyButton: "Siirry kyselyyn 2: Kompensoitu",
        woundTooltip_O: "Hylkääminen: Pelko tulla jätetyksi, fyysisesti tai emotionaalisesti.",
        woundTooltip_A: "Torjunta: Tunne riittämättömyydestä, kuulumattomuudesta tai ei-toivotusta.",
        woundTooltip_F: "Nöyryytys: Häpeän tunne, pienuuden, väärän tai arvottomuuden tunne.",
        woundTooltip_S: "Petos: Pelko tulla petetyksi, mikä johtaa epäluottamukseen.",
        woundTooltip_R: "Epäoikeudenmukaisuus: Tunne siitä, että elämä on epäoikeudenmukaista ja että sinua kohdellaan väärin.",
        woundTooltip_E: "Yksinäisyys: Syvä sisäinen yksinäisyyden tunne, riippumatta seurasta."
    },
    es: {
        idleTitle: "Encuesta: Heridas Fundamentales para la Autorreflexión",
        idleWelcome: "Bienvenido a un viaje hacia el interior. Esta herramienta está diseñada para ayudarte a reflexionar sobre tus llamadas <strong>Heridas Fundamentales</strong>.",
        idleDescription: "El término psicológico correcto es <strong>Trauma Acumulativo por Estrés y Desarrollo (CSDT)</strong>. A diferencia de los eventos únicos e impactantes (TEPT), el CSDT surge de experiencias negativas repetidas y a menudo sutiles a lo largo del tiempo, especialmente durante la infancia. Esto puede variar desde la negligencia emocional y la crítica constante hasta un entorno familiar impredecible. Debido a que estas experiencias se normalizan, se convierten en parte de nuestra realidad 'normal' y pueden moldear nuestra autoimagen, nuestras relaciones y cómo vemos el mundo. Los efectos a largo plazo pueden incluir baja autoestima, dificultad para confiar y un sentimiento persistente de no ser suficiente.",
        idleInstructions: "Considera esta encuesta como un primer paso en tu autorreflexión. Responde honestamente basándote en lo que sientas más verdadero para ti. Cuando termines, tus respuestas serán analizadas para darte una visión personal. Toda la información se maneja de acuerdo con nuestra <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>política de privacidad</a>.",
        startQuizButton: "Iniciar Encuesta",
        emailPrompt: "Introduce tu correo electrónico para continuar",
        activeTitle: "Encuesta de Autorreflexión",
        submitButton: "Enviar y Ver Resultados",
        pleaseAnswerAll: "Por favor, responde a todas las preguntas para continuar.",
        errorTitle: "Ha ocurrido un error",
        analysisError: "Ocurrió un error durante el análisis. Por favor, inténtalo de nuevo.",
        tryAgainButton: "Intentar de Nuevo",
        footerText: "Copyright © Klätterträdet 2024",
        loadingAnalysis: "Analizando tus respuestas...",
        loadingTakeAMoment: "Esto puede llevar un momento.",
        userEmail: "Correo electrónico del usuario",
        resultsTitle: "Tu Resultado",
        resultsSubtitle: "Aquí tienes un análisis de tus respuestas, diseñado para apoyar tu autorreflexión.",
        summaryTitle: "Análisis Resumido",
        scoresOverviewTitle: "Resumen de Puntuaciones",
        resetQuizButton: "Repetir Encuesta",
        score: "Puntuación",
        woundName: "Herida Fundamental",
        privacyInfo: "Tu privacidad es importante para nosotros. Todo el análisis de tus respuestas se realiza de forma anónima y directamente en tu navegador. No se guardan datos personales ni respuestas individuales en nuestros servidores. Para una descripción completa, por favor lee nuestra <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>política de privacidad</a>.",
        topWoundsTitle: "Tus Heridas Fundamentales Más Prominentes",
        primaryWoundTitle: "Herida Fundamental Primaria",
        secondaryWoundTitle: "Herida Fundamental Secundaria",
        categoriesTitle: "Entiende tu Nivel de Impacto por Herida",
        regulatedTitle: "Regulado",
        regulatedDescription: "Indica que esta área tiene un bajo impacto en tu vida diaria. Probablemente tienes estrategias de afrontamiento saludables.",
        compensatedTitle: "Compensado",
        compensatedDescription: "Sugiere que puedes experimentar desafíos pero has desarrollado estrategias para manejarlos, lo cual puede consumir energía.",
        overwhelmedTitle: "Abrumado",
        overwhelmedDescription: "Indica que esta área tiene un impacto significativo en tus pensamientos, sentimientos y comportamientos. El apoyo podría ser valioso aquí.",
        woundDistributionTitle: "Distribución de Heridas Fundamentales",
        detailedBreakdownTitle: "Desglose Detallado",
        totalScoreTitle: "Tu Nivel de Impacto Total",
        totalScore: "Puntuación Total",
        regulatedMainTitle: "Regulado (0-49 puntos)",
        regulatedMainDescription: "Tu puntuación total indica una fuerte capacidad de autorregulación y un alto grado de conciencia emocional. Probablemente tienes una base estable y has desarrollado estrategias saludables y efectivas para manejar los desafíos de la vida. Esto sugiere resiliencia, un núcleo interno seguro y una conexión saludable con tus emociones, lo que te permite navegar las dificultades de una manera equilibrada y constructiva. Aunque algunas heridas pueden estar presentes, no afectan significativamente tu vida diaria.",
        compensatedMainTitle: "Compensado (50-79 puntos)",
        compensatedLowDescription: "Tu puntuación total sugiere que te encuentras en un estado compensado, manejando activamente las heridas subyacentes. Has desarrollado mecanismos de defensa funcionales, pero estos pueden consumir energía y a veces llevar al estrés o al agotamiento. Hay conciencia, pero también vulnerabilidad.",
        compensatedHighDescription: "Tu puntuación total sugiere que te encuentras en un estado compensado, pero con un mayor esfuerzo. Trabajas duro para manejar tus heridas, lo que puede llevar a una sensación de estar constantemente en guardia. Puedes experimentar períodos de estrés y fatiga, y existe el riesgo de que tus estrategias se sobrecarguen bajo presión.",
        overwhelmedMainTitle: "Abrumado (80-120 puntos)",
        overwhelmedMainDescription: "Tu puntuación total indica que tus heridas fundamentales tienen un impacto significativo y notable en tu vida diaria. Puedes experimentar emociones intensas, patrones de pensamiento negativos recurrentes y dificultades en las relaciones. Tus estrategias de afrontamiento habituales pueden parecer inadecuadas y podrías sentirte atascado o abrumado. Esta es una señal clara de que es hora de buscar apoyo para procesar estas heridas y encontrar nuevos caminos más sostenibles hacia adelante.",
        recommendationTitle: "Recomendación y Próximos Pasos",
        recommendationLowScore: "Tu resultado sugiere una buena base de autoconciencia y resiliencia. Continúa cultivando tu salud emocional a través de la autorreflexión. Si una herida específica todavía resuena contigo, puede ser valioso explorarla más a fondo por tu cuenta o con un amigo.",
        recommendationHighScore: "Tu resultado indica que llevas un dolor emocional significativo que afecta tu bienestar. Buscar apoyo profesional de un terapeuta o psicólogo puede ser un paso crucial hacia la curación. En <a href='https://www.klattertradet.se' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>Klätterträdet</a>, ofrecemos ayuda especializada para procesar CSDT. Por favor, contáctanos para una consulta inicial.",
        sendToHorizontenButton: "Enviar a Horizonten",
        emailSubject: "Resultados de la Encuesta de Heridas Fundamentales",
        copyButton: "Copiar Texto",
        copiedButton: "¡Copiado!",
        nextSurveyButton: "Ir a la Encuesta 2: Compensado",
        woundTooltip_O: "Abandono: El miedo a ser dejado, física o emocionalmente.",
        woundTooltip_A: "Rechazo: El sentimiento de no ser suficiente, de no pertenecer o de no ser deseado.",
        woundTooltip_F: "Humillación: El sentimiento de vergüenza, de ser pequeño, incorrecto o sin valor.",
        woundTooltip_S: "Traición: El miedo a ser engañado, lo que lleva a la desconfianza.",
        woundTooltip_R: "Injusticia: El sentimiento de que la vida es injusta y que uno es tratado incorrectamente.",
        woundTooltip_E: "Soledad: Un profundo sentimiento interno de estar solo, independientemente de la compañía."
    },
    de: {
        idleTitle: "Umfrage: Kernwunden zur Selbstreflexion",
        idleWelcome: "Willkommen auf einer Reise nach innen. Dieses Tool soll Ihnen helfen, über Ihre sogenannten <strong>Kernwunden</strong> nachzudenken.",
        idleDescription: "Der korrekte psychologische Begriff ist <strong>Kumulatives Stress- und Entwicklungstrauma (CSDT)</strong>. Im Gegensatz zu einzelnen, schockierenden Ereignissen (PTBS) entsteht CSDT aus wiederholten und oft subtilen negativen Erfahrungen über die Zeit, insbesondere in der Kindheit. Dies kann von emotionaler Vernachlässigung und ständiger Kritik bis hin zu einer unvorhersehbaren häuslichen Umgebung reichen. Da diese Erfahrungen normalisiert werden, werden sie Teil unserer 'normalen' Realität und können unser Selbstbild, unsere Beziehungen und unsere Sicht auf die Welt prägen. Langfristige Auswirkungen können geringes Selbstwertgefühl, Schwierigkeiten mit Vertrauen und ein anhaltendes Gefühl, nicht gut genug zu sein, umfassen.",
        idleInstructions: "Betrachten Sie diese Umfrage als einen ersten Schritt in Ihrer Selbstreflexion. Antworten Sie ehrlich, basierend auf dem, was sich für Sie am wahrsten anfühlt. Wenn Sie fertig sind, werden Ihre Antworten analysiert, um Ihnen persönliche Einblicke zu geben. Alle Informationen werden gemäß unserer <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>Datenschutzrichtlinie</a> behandelt.",
        startQuizButton: "Umfrage starten",
        emailPrompt: "Geben Sie Ihre E-Mail-Adresse ein, um fortzufahren",
        activeTitle: "Selbstreflexions-Umfrage",
        submitButton: "Senden und Ergebnisse sehen",
        pleaseAnswerAll: "Bitte beantworten Sie alle Fragen, um fortzufahren.",
        errorTitle: "Ein Fehler ist aufgetreten",
        analysisError: "Bei der Analyse ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        tryAgainButton: "Erneut versuchen",
        footerText: "Copyright © Klätterträdet 2024",
        loadingAnalysis: "Analysiere deine Antworten...",
        loadingTakeAMoment: "Dies kann einen Moment dauern.",
        userEmail: "E-Mail des Benutzers",
        resultsTitle: "Ihr Ergebnis",
        resultsSubtitle: "Hier ist eine Analyse Ihrer Antworten, die Ihre Selbstreflexion unterstützen soll.",
        summaryTitle: "Zusammenfassende Analyse",
        scoresOverviewTitle: "Punkteübersicht",
        resetQuizButton: "Umfrage wiederholen",
        score: "Punkte",
        woundName: "Kernwunde",
        privacyInfo: "Ihre Privatsphäre ist uns wichtig. Die gesamte Analyse Ihrer Antworten erfolgt anonym und direkt in Ihrem Browser. Es werden keine persönlichen Daten oder einzelnen Antworten auf unseren Servern gespeichert. Für eine vollständige Beschreibung lesen Sie bitte unsere <a href='https://www.klattertradet.com/integritet-och-sekretess-policy' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>Datenschutzrichtlinie</a>.",
        topWoundsTitle: "Ihre prominentesten Kernwunden",
        primaryWoundTitle: "Primäre Kernwunde",
        secondaryWoundTitle: "Sekundäre Kernwunde",
        categoriesTitle: "Verstehen Sie Ihr Auswirkungsniveau pro Wunde",
        regulatedTitle: "Reguliert",
        regulatedDescription: "Zeigt an, dass dieser Bereich einen geringen Einfluss auf Ihr tägliches Leben hat. Sie haben wahrscheinlich gesunde Bewältigungsstrategien.",
        compensatedTitle: "Kompensiert",
        compensatedDescription: "Deutet darauf hin, dass Sie möglicherweise Herausforderungen erleben, aber Strategien entwickelt haben, um damit umzugehen, was energieaufwändig sein kann.",
        overwhelmedTitle: "Überwältigt",
        overwhelmedDescription: "Zeigt an, dass dieser Bereich einen erheblichen Einfluss auf Ihre Gedanken, Gefühle und Verhaltensweisen hat. Unterstützung könnte hier wertvoll sein.",
        woundDistributionTitle: "Verteilung der Kernwunden",
        detailedBreakdownTitle: "Detaillierte Aufschlüsselung",
        totalScoreTitle: "Ihr Gesamtauswirkungsniveau",
        totalScore: "Gesamtpunktzahl",
        regulatedMainTitle: "Reguliert (0-49 Punkte)",
        regulatedMainDescription: "Ihre Gesamtpunktzahl deutet auf eine starke Fähigkeit zur Selbstregulation und ein hohes Maß an emotionalem Bewusstsein hin. Sie haben wahrscheinlich eine stabile Grundlage und haben gesunde, effektiva Strategien entwickelt, um mit den Herausforderungen des Lebens umzugehen. Dies deutet auf Resilienz, einen sicheren inneren Kern und eine gesunde Verbindung zu Ihren Emotionen hin, die es Ihnen ermöglichen, Schwierigkeiten auf eine ausgewogene und konstruktive Weise zu bewältigen. Obwohl einige Wunden vorhanden sein können, beeinträchtigen sie Ihr tägliches Leben nicht wesentlich.",
        compensatedMainTitle: "Kompensiert (50-79 Punkte)",
        compensatedLowDescription: "Ihre Gesamtpunktzahl deutet darauf hin, dass Sie sich in einem kompensierten Zustand befinden und zugrunde liegende Wunden aktiv bewältigen. Sie haben funktionale Abwehrmechanismen entwickelt, aber diese können energieaufwändig sein und manchmal zu Stress oder Erschöpfung führen. Es gibt ein Bewusstsein, aber auch eine Verletzlichkeit.",
        compensatedHighDescription: "Ihre Gesamtpunktzahl deutet darauf hin, dass Sie sich in einem kompensierten Zustand befinden, jedoch mit größerem Aufwand. Sie arbeiten hart daran, Ihre Wunden zu bewältigen, was zu dem Gefühl führen kann, ständig auf der Hut zu sein. Sie können Perioden von Stress und Müdigkeit erleben, und es besteht das Risiko, dass Ihre Strategien unter Druck überlastet werden.",
        overwhelmedMainTitle: "Überwältigt (80-120 Punkte)",
        overwhelmedMainDescription: "Ihre Gesamtpunktzahl deutet darauf hin, dass Ihre Kernwunden einen erheblichen und spürbaren Einfluss auf Ihr tägliches Leben haben. Sie können intensive Emotionen, wiederkehrende negative Denkmuster und Schwierigkeiten in Beziehungen erleben. Ihre üblichen Bewältigungsstrategien fühlen sich möglicherweise unzureichend an, und Sie könnten sich festgefahren oder überwältigt fühlen. Dies ist ein klares Signal, dass es an der Zeit ist, Unterstützung zu suchen, um diese Wunden zu verarbeiten und neue, nachhaltigere Wege nach vorne zu finden.",
        recommendationTitle: "Empfehlung & Nächste Schritte",
        recommendationLowScore: "Ihr Ergebnis deutet auf eine gute Grundlage von Selbstbewusstsein und Resilienz hin. Pflegen Sie weiterhin Ihre emotionale Gesundheit durch Selbstreflexion. Wenn eine bestimmte Wunde immer noch bei Ihnen Anklang findet, kann es wertvoll sein, sie alleine oder mit einem Freund weiter zu erforschen.",
        recommendationHighScore: "Ihr Ergebnis deutet darauf hin, dass Sie erheblichen emotionalen Schmerz tragen, der Ihr Wohlbefinden beeinträchtigt. Professionelle Unterstützung von einem Therapeuten oder Psychologen zu suchen, kann ein entscheidender Schritt zur Heilung sein. Bei <a href='https://www.klattertradet.se' target='_blank' rel='noopener noreferrer' class='text-brand-secondary hover:underline font-semibold'>Klätterträdet</a> bietet wir spezialisierte Hilfe bei der Verarbeitung von CSDT an. Bitte kontaktieren Sie uns für ein Erstgespräch.",
        sendToHorizontenButton: "An Horizonten senden",
        emailSubject: "Ergebnisse der Kernwunden-Umfrage",
        copyButton: "Text kopieren",
        copiedButton: "Kopiert!",
        nextSurveyButton: "Weiter zur Umfrage 2: Kompensiert",
        woundTooltip_O: "Verlassenheit: Die Angst, körperlich oder emotional verlassen zu werden.",
        woundTooltip_A: "Ablehnung: Das Gefühl, nicht gut genug zu sein, nicht dazuzugehören oder unerwünscht zu sein.",
        woundTooltip_F: "Demütigung: Das Gefühl der Scham, klein, falsch oder wertlos zu sein.",
        woundTooltip_S: "Verrat: Die Angst, betrogen zu werden, was zu Misstrauen führt.",
        woundTooltip_R: "Ungerechtigkeit: Das Gefühl, dass das Leben unfair ist und man falsch behandelt wird.",
        woundTooltip_E: "Einsamkeit: Ein tiefes inneres Gefühl des Alleinseins, unabhängig von Gesellschaft."
    }
};

export const useTranslations = (): Translations => {
  const { language } = useLanguage();
  return translations[language];
};
