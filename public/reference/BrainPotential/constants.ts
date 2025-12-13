
import type { Challenge } from './types';
import { Target, Difficulty, ChallengeCategory } from './types';

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    text: "數十億至數萬億個參數",
    target: Target.LLM,
    explanation: "人工智慧 - 大型語言模型（LLM）的規模由其參數（權重和偏差）來衡量，範圍可以從數十億到超過一萬億。這是衡量其大小和複雜性的關鍵指標。",
    category: ChallengeCategory.Fact
  },
  {
    id: 2,
    text: "約有 860 億個神經元",
    target: Target.Brain,
    explanation: "人腦包含約 860 億個神經元，它們是透過電氣和化學信號處理和傳輸資訊的基本單位。",
    category: ChallengeCategory.Fact
  },
  {
    id: 3,
    text: "從海量文本數據中學習",
    target: Target.LLM,
    explanation: "大型語言模型在海量的文本和程式碼數據集上進行訓練，透過優化預測序列中下一個單詞等任務來學習模式、語法和資訊。",
    category: ChallengeCategory.Fact
  },
  {
    id: 4,
    text: "透過感官經驗和社交互動學習",
    target: Target.Brain,
    explanation: "大腦從現實世界的感官輸入、運動行為和複雜的社交互動中持續高效地學習，只需少量數據就能快速適應。",
    category: ChallengeCategory.Fact
  },
  {
    id: 5,
    text: "極低的能量消耗（約 20 瓦）",
    target: Target.Brain,
    explanation: "儘管人腦具有巨大的計算能力，但其能源效率極高，運行功率約為 20 瓦——相當於一個昏暗燈泡的功率。",
    category: ChallengeCategory.Fact
  },
  {
    id: 6,
    text: "能量消耗極高，尤其在訓練期間",
    target: Target.LLM,
    explanation: "訓練和運行大型語言模型需要巨大的計算能力，導致數據中心消耗大量能源。",
    category: ChallengeCategory.Fact
  },
  {
    id: 7,
    text: "架構通常基於 Transformer",
    target: Target.LLM,
    explanation: "大多數現代大型語言模型都建立在 Transformer 架構之上，該架構利用注意力機制，在處理像語言這樣的序列數據方面非常有效。",
    category: ChallengeCategory.Fact
  },
  {
    id: 8,
    text: "架構是高度遞歸和大規模並行的",
    target: Target.Brain,
    explanation: "大腦是一個複雜的、自我組織的網絡，具有大規模的並行處理能力、複雜的反饋迴路和化學神經調節。這種動態且靈活的架構，與當前人工神經網絡的結構有著根本性的不同。",
    category: ChallengeCategory.Fact
  },
  {
    id: 9,
    text: "估計有 100 至 1,000 萬億個突觸",
    target: Target.Brain,
    explanation: "突觸是神經元之間的連接點。雖然將其數量（約100-1000萬億）與LLM的參數進行比較是一個有用的類比，但突觸在生物學上要複雜得多，具有動態變化的強度。原始數量的比較並不完全反映智能，因為兩種系統處理資訊的方式截然不同。",
    category: ChallengeCategory.Fact
  },
  {
    id: 10,
    text: "展現通用智能、創造力和情感",
    target: Target.Brain,
    explanation: "人腦擁有廣泛的通用智能，能夠進行抽象推理、體驗真正的情感和意識。雖然現代AI在推理任務上已展現出驚人的能力，但這種通用、有意識且具備情感深度的智能，仍然是人類獨有的特質。",
    category: ChallengeCategory.Fact
  },
  {
    id: 11,
    text: "只需少量範例即可快速學習（單次學習）",
    target: Target.Brain,
    explanation: "人腦擅長從極少的數據中歸納和學習新概念，有時甚至只需要一個例子。這種能力被稱為『單次學習』，與需要大量數據進行訓練的機器學習模型形成鮮明對比。",
    category: ChallengeCategory.Fact
  },
  {
    id: 12,
    text: "需要大量數據和廣泛的微調",
    target: Target.LLM,
    explanation: "大型語言模型需要遍歷龐大的數據集來學習模式，並且通常需要針對特定任務進行進一步的微調，這是一個計算成本高昂的過程，與人類的快速適應能力不同。",
    category: ChallengeCategory.Fact
  },
  {
    id: 13,
    text: "直觀地理解物理和社會情境",
    target: Target.Brain,
    explanation: "人類透過與物理世界的互動發展出根深蒂固的常識（即『具身認知』）。這使我們能夠直觀地應對物理和社交情境。雖然AI在這方面取得了長足的進步，但要達到人類水平的流暢度和可靠性仍然是一個重大的挑戰。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 14,
    text: "以超乎人類的速度處理和合成資訊",
    target: Target.LLM,
    explanation: "大型語言模型可以秒速閱讀和分析數百萬份文件，找出趨勢並總結資訊，其規模和速度遠超任何人類的能力。這使其成為增強人類研究和決策的強大工具。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 15,
    text: "提出新穎的問題並設定創造性方向",
    target: Target.Brain,
    explanation: "人類的好奇心和意圖是創新的驅動力。我們提出『為什麼』和『如果……會怎樣』等問題，為科學發現、藝術創作和技術進步開闢了新的道路，而人工智慧目前則在既定目標下運作。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 16,
    text: "快速生成多樣化的想法以激發人類創造力",
    target: Target.LLM,
    explanation: "作為一個協作工具，大型語言模型可以根據一個提示生成數十種變化、草稿或概念，為人類設計師、作家和策略家提供豐富的起點，從而加速創造過程。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 17,
    text: "在交通尖峰時段，安全地穿越一條充滿不可預測障礙物的繁忙街道。",
    target: Target.Brain,
    explanation: "人腦能出色地整合多種感官輸入（視覺、聽覺、觸覺），並利用常識來預測動態環境中的運動，從而實現即時適應。自動駕駛汽車仍在努力達到同等水平的可靠性。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 18,
    text: "在幾分鐘內分析數千份醫學研究論文，以識別潛在的藥物相互作用。",
    target: Target.LLM,
    explanation: "AI可以以超乎人類的速度處理和交叉引用海量數據集。這使其在藥物發現、基因組學和金融等領域，從龐大資訊中識別模式方面，成為一個無價的工具。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 19,
    text: "透過理解微妙的情感線索和提供有同理心的支持來安慰一位傷心的朋友。",
    target: Target.Brain,
    explanation: "人類擁有高度發達的情感和社交智慧，使我們能夠解讀非語言信號、感受同理心並建立深層的人際聯繫。AI可以模擬同理心，但缺乏真正的情感理解。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 20,
    text: "同時為數百萬名學生生成個性化的學習計劃，並根據他們的進度進行調整。",
    target: Target.LLM,
    explanation: "AI系統可以大規模地分析個人表現數據，為每個學習者量身定制教育內容。這種個性化的方法可以優化學習成果，這是人類教師無法為如此多學生做到的。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 21,
    text: "發明一種全新的音樂流派或藝術形式。",
    target: Target.Brain,
    explanation: "真正的創造力通常源於意圖、個人經驗和抽象思維的結合，從而產生全新的概念。雖然AI可以生成令人印象深刻的作品，但它缺乏推動這種開創性創新的內在動力。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 22,
    text: "即時翻譯兩位說不同語言的人之間的現場對話。",
    target: Target.LLM,
    explanation: "大型語言模型在處理和翻譯語言方面非常出色，能夠實現近乎即時的溝通。它們能夠處理語法、句法和龐大的詞彙量，其速度和準確性是大多數人類無法比擬的。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 23,
    text: "能夠進行元認知，即『思考自己的思考過程』。",
    target: Target.Brain,
    explanation: "元認知，即監控和調節自身認知過程的能力，是人類意識的一個關鍵方面。它使我們能夠評估自己的知識、反思自己的錯誤並改變策略。AI模型缺乏這種自我意識。",
    category: ChallengeCategory.Fact
  },
  {
    id: 24,
    text: "記憶容量可以透過增加硬體來輕易擴展。",
    target: Target.LLM,
    explanation: "大型語言模型的知識儲存在其參數中，並且可以透過在更多數據上進行訓練或增加模型大小來擴展。相比之下，人腦的記憶雖然靈活，但在生物學上是有限的。",
    category: ChallengeCategory.Fact
  },
  {
    id: 25,
    text: "根據豐富的情感背景和個人經歷做出決策。",
    target: Target.Brain,
    explanation: "人類的決策過程與情感、直覺和個人歷史深深交織在一起。這些因素使我們能夠在複雜的社交情境中做出細緻的判斷，而AI的決策則是基於數據和邏輯規則。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 26,
    text: "以完美的保真度回憶其訓練數據中的具體資訊。",
    target: Target.LLM,
    explanation: "大型語言模型可以像數據庫一樣，精確地回憶其訓練集中包含的大量事實資訊。人類的記憶則是重建性的，容易出現錯誤和偏見。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 27,
    text: "透過物理性地重新組織其結構和連接來適應學習（神經可塑性）。",
    target: Target.Brain,
    explanation: "神經可塑性是大腦根據經驗重新佈線的能力。這種持續的結構性變化是學習和記憶的基礎，使其具有高度的適應性。AI模型的架構在訓練後基本上是固定的。",
    category: ChallengeCategory.Fact
  },
  {
    id: 28,
    text: "根據自然語言描述，在幾秒鐘內編寫、解釋和調試複雜的程式碼片段。",
    target: Target.LLM,
    explanation: "大型語言模型在理解程式碼的模式和語法方面表現出色，使其能夠快速生成功能性程式碼、解釋複雜的演算法並協助開發人員找出錯誤，從而顯著提高生產力。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 29,
    text: "透過與物理世界的直接互動來理解『重』、『軟』或『溫暖』等概念。",
    target: Target.Brain,
    explanation: "人類的理解是『具身的』——我們的知識深深植根於我們的身體與世界的感官和運動互動中。AI模型則透過統計關聯來理解這些概念，缺乏直接的物理體驗。",
    category: ChallengeCategory.Fact
  },
  {
    id: 30,
    text: "容易受到對抗性攻擊的影響，即微小的輸入變化可能導致完全錯誤的輸出。",
    target: Target.LLM,
    explanation: "與人類視覺和推理的穩健性不同，AI模型可能會被精心設計的輸入所欺騙。這種脆弱性凸顯了它們的決策過程與人類的根本差異。",
    category: ChallengeCategory.Fact
  },
  {
    id: 31,
    text: "根據對公司文化和市場直覺的深刻理解，為企業制定長期戰略計劃。",
    target: Target.Brain,
    explanation: "制定戰略需要對人類動機、組織動態和市場情緒有細緻的理解——這些是人類領導者透過經驗培養出的直覺能力。AI可以分析數據以支持決策，但缺乏制定整體願景所需的人類洞察力。",
    category: ChallengeCategory.UseCase
  },
  {
    id: 32,
    text: "在包含數千次交流的極長對話中，始終保持上下文和一致性。",
    target: Target.LLM,
    explanation: "由於其龐大的上下文窗口，現代大型語言模型可以追蹤和引用極長對話中的資訊，而不會像人類那樣忘記細節或偏離主題。這使它們在需要長期互動的應用中非常強大。",
    category: ChallengeCategory.UseCase
  }
];

export const DIFFICULTY_LEVELS: Record<Difficulty, number> = {
  [Difficulty.Easy]: 6,
  [Difficulty.Medium]: 10,
  [Difficulty.Hard]: CHALLENGES.length,
};
