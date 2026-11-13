window.LAB2 = {
  "title": "Tips for Sophie · Research Setup",
  "slides": [
    {
      "n": 1,
      "title": "Tips for Sophie 😊",
      "subtitle": "Build one research tool for better prospecting decisions",
      "tabs": [
        {
          "label": "Start here",
          "type": "sophieIntro"
        }
      ],
      "note": "Follow the seven steps in order. Each step shows its input, action and result, followed by a prompt you can copy. Download the anonymised kit from this slide before starting. It supplies a reusable method for checking evidence and reviewing results."
    },
    {
      "n": 2,
      "title": "Analyse The Research Kit",
      "subtitle": "Understand the method before adapting it",
      "tabs": [
        {
          "label": "Step",
          "type": "setupStep",
          "number": 1,
          "input": "Research_Workflow_Kit.md",
          "action": "Read the complete workflow",
          "result": "Research workflow analysed"
        },
        {
          "label": "Prompt",
          "type": "prompt",
          "prompt": "Read Research_Workflow_Kit.md in this project. It is an anonymised research method I want to adapt for my creator and podcast strategy business.\n\nExplain how its collection, verification, independent review, evidence rules and repeat prevention could support my research. Confirm “Research workflow analysed” here in the conversation. Do not create another analysis file. If the kit is missing, ask me to attach it before continuing.",
          "guide": [
            "Read the supplied kit",
            "Explain the reusable method",
            "Confirm analysis in conversation"
          ]
        }
      ],
      "note": "The kit explains the research method. Ask Claude to read all of it and explain the parts you will reuse. The result stays in the conversation. There is no need to save another analysis document."
    },
    {
      "n": 3,
      "title": "Define Your Brand Fit",
      "subtitle": "Save the criteria every research run will use",
      "tabs": [
        {
          "label": "Step",
          "type": "setupStep",
          "number": 2,
          "input": "My business and interview answers",
          "action": "Interview and confirm criteria",
          "result": "brand-market-fit-test.md"
        },
        {
          "label": "Prompt",
          "type": "prompt",
          "prompt": "Help me define strong-fit brands for my creator and podcast strategy business. I advise brands on audiences, creators, podcasts and community activations.\n\nInterview me one focused question at a time. Establish what mid-market means for my offer, my target audiences, strong and weak brand examples, exclusions, funding recency and Australian expansion signals. Include Australian brands and prospects from the United States and United Kingdom. Use Bobby as a retrospective example. Distinguish fit from a timely reason to approach.\n\nShow a structured fit test, including examples and unresolved questions. After I approve it, create brand-market-fit-test.md in this project folder. All later research should use that file.",
          "guide": [
            "Interview one question at a time",
            "Confirm the fit criteria",
            "Save brand-market-fit-test.md"
          ]
        }
      ],
      "note": "Your fit test is the shared decision rule for future runs. Define who you can help, which signals matter, and what should exclude a prospect. A funding round can suggest possible budget, while a launch or local hire may provide a reason to act now. Approve the criteria before Claude saves brand-market-fit-test.md."
    },
    {
      "n": 4,
      "title": "Enable Deep Research",
      "subtitle": "Identify the intended skill and test it",
      "tabs": [
        {
          "label": "Step",
          "type": "setupStep",
          "number": 3,
          "input": "Available skills",
          "action": "Find or install /deep-research",
          "result": "Verified research capability"
        },
        {
          "label": "Prompt",
          "type": "prompt",
          "prompt": "Find /deep-research in my available skills and read its instructions. Verify its source and explain how we can use it with Research_Workflow_Kit.md and brand-market-fit-test.md.\n\nIf unavailable, help me find and install the intended /deep-research skill from a source I approve. Do not assume a skill exists or that its name proves who created it. Guide me one step at a time and wait for “done” when I must act.\n\nIf only Claude’s Research feature is available, explain the difference and agree an alternative with me. Test the selected capability and report the result here. Record any required dependency in the unified skill when we create it.",
          "guide": [
            "Find /deep-research",
            "Verify source and instructions",
            "Install and test if needed"
          ]
        }
      ],
      "note": "A skill is a reusable set of instructions. Verify which /deep-research skill is available and where it came from before installing or using it. Its name alone does not identify its author. Claude’s built-in Research feature is a separate capability. If you use that instead, confirm the change and test it before building the unified skill."
    },
    {
      "n": 5,
      "title": "Connect And Test Sources",
      "subtitle": "Prove each input and delivery connection works",
      "tabs": [
        {
          "label": "Step",
          "type": "setupStep",
          "number": 4,
          "input": "Approved accounts and sources",
          "action": "Connect and retrieve sample results",
          "result": "Passed or missing access"
        },
        {
          "label": "Source setup",
          "type": "radarFlow"
        },
        {
          "label": "Prompt",
          "type": "prompt",
          "prompt": "Set up and test the sources for our unified research tool.\n\nHelp me connect Crunchbase and enable its Funding Signals Screener skill. Check what my account can access. Guide me one step at a time and wait for “done” after each action I need to take.\n\nUse Mumbrella, B&T, Adweek, Mediaweek, AdNews and Mi3, plus [podcast industry publications I approve]. Help me configure Inoreader feeds and email rules, connect Gmail in Claude, and verify that Claude can retrieve both brand alerts and industry news. Use public original announcements for verification.\n\nConnect [Google Drive or another supported cloud location] for the shared research files and [Slack or email] for private delivery. Test the specific read and delivery actions we need with my approval. Explain any required subscriptions or missing access before asking me to enable them. Do not assume an unverified connector exists.\n\nReport each test result here with the returned evidence. No research-connections Markdown file is needed. Create separate press-alert labels for Brand Radar and Industry Radar. Do not schedule anything yet.",
          "guide": [
            "Test Crunchbase and screener",
            "Read both press labels",
            "Test storage and private delivery"
          ]
        }
      ],
      "note": "Model Context Protocol (MCP) lets Claude use connected sources and tools. Test Crunchbase, both press-alert labels, shared files and private delivery. A passed check should include a returned result. Keep the results in the conversation. An extra connections document is unnecessary. Confirm subscriptions and access before relying on a source."
    },
    {
      "n": 6,
      "title": "Create The Unified Skill",
      "subtitle": "Combine the approved method and connected research tools",
      "tabs": [
        {
          "label": "Step",
          "type": "setupStep",
          "number": 5,
          "input": "Kit and fit file plus tools",
          "action": "Build and approve /brand-radar",
          "result": "Reusable skill and event log"
        },
        {
          "label": "Prompt",
          "type": "prompt",
          "prompt": "Use /skill-creator to create /brand-radar from Research_Workflow_Kit.md, brand-market-fit-test.md, the verified /deep-research instructions, Crunchbase’s Funding Signals Screener and our tested connections.\n\nUse the actual kit and skill instructions to define the workflow. Preserve independent review, evidence labels, source dates, privacy and repeat prevention. Provide strong-fit brand alerts, a short creator and podcast industry brief without social monitoring, and brand research on request.\n\nKeep one authoritative procedure inside the unified skill. Create supporting templates only when needed and a persistent event log in [our agreed accessible location]. A separate RUN.md is optional. Show the proposed skill and files for approval before saving. Do not create an analysis report or connections report.",
          "guide": [
            "Combine kit and /deep-research",
            "Create /brand-radar",
            "Approve skill and persistent log"
          ]
        }
      ],
      "note": "/brand-radar combines the approved fit test, the kit, /deep-research and connected sources. Keep one authoritative procedure inside the skill. A separate RUN.md file is optional. The event log records what has already been reported. Agree where the skill and its supporting data will be available before saving them."
    },
    {
      "n": 7,
      "title": "Test And Refine",
      "subtitle": "Inspect evidence and reviewer corrections before scheduling",
      "tabs": [
        {
          "label": "Step",
          "type": "setupStep",
          "number": 6,
          "input": "Unified skill and sample brands",
          "action": "Run research and independent review",
          "result": "Approved sample brief"
        },
        {
          "label": "Reviewer example",
          "type": "radarReview"
        },
        {
          "label": "Prompt",
          "type": "prompt",
          "prompt": "Test /brand-radar using Bobby as a retrospective case and one current candidate. Apply brand-market-fit-test.md and the approved research kit. For Bobby, distinguish what was publicly knowable at the time from later information.\n\nUse our tested Crunchbase and press sources. Have a separate reviewer inspect the claims and source evidence. Show the sample brief, the reviewer’s corrections and any missing access. If separate review is unavailable, tell me and ask me to review before delivery.\n\nAsk what I want improved. Apply approved changes to the skill, then confirm it is ready for a scheduled test. Keep this trial separate from the live event log and do not send anything.",
          "guide": [
            "Test retrospective and current cases",
            "Review claims independently",
            "Approve changes before scheduling"
          ]
        }
      ],
      "note": "Use Bobby to test what could have been known at the time, then try one current candidate. Inspect the source evidence and what the independent reviewer corrected. The fictional example shows why a local pilot should not be described as a nationwide launch. Approve useful changes before moving to scheduling."
    },
    {
      "n": 8,
      "title": "Create Your Schedules",
      "subtitle": "Test scheduled access and confirm private delivery",
      "tabs": [
        {
          "label": "Step",
          "type": "setupStep",
          "number": 7,
          "input": "Approved skill and delivery preferences",
          "action": "Test then create scheduled tasks",
          "result": "Brand alerts and industry briefing"
        },
        {
          "label": "Prompt",
          "type": "prompt",
          "prompt": "Help me schedule /brand-radar. Confirm [brand-alert check times and time zone], [weekly industry-brief time and time zone], [word limits] and [private delivery destination].\n\nFirst identify where the skill, fit file, research kit and event log live. If a run depends on local files or local tools, use a local schedule in Claude Code Desktop and explain that the app must remain open and the computer awake and online. If I want a cloud schedule, first make the required guidance and data available to that environment with my approval and verify access. Do not assume a cloud run can read files on my computer.\n\nTest /brand-radar, /deep-research, Crunchbase, press alerts, shared files, the event log and delivery in the actual scheduled environment. If a dependency is unavailable, agree a working fallback with me before scheduling.\n\nCreate the schedules for timely brand alerts and the weekly creator and podcast industry brief. Include full approved operating guidance in the schedule instructions and reference only accessible files and tools. Use the same fit file and event log for both. Alert only on new qualifying events. On-demand research should remain available through /brand-radar.\n\nRun a supervised test and confirm delivery. Show where to review results, change timing or pause a schedule. Do not contact prospects or modify sales records.",
          "guide": [
            "Choose local or cloud execution",
            "Verify files and connector access",
            "Test delivery and pause controls"
          ]
        }
      ],
      "note": "Test dependencies in the scheduled environment, including the skill, data access, storage and delivery. Agree an alternative if something is unavailable. Include the full approved guidance in each schedule and keep one shared event log. Verify a delivered result and locate the controls for reviewing, changing or pausing the schedules. Connectors are called during each run as needed; scheduling does not create a continuous monitor. New items are detected at the next successful check. For local file or tool dependencies, use the local Code schedule and keep the app open and computer awake and online. Use a cloud schedule only after verifying that all required guidance, state and tools are accessible there."
    }
  ]
};
