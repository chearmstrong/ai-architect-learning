import type { Question } from "../domain/types";

export const questions: Question[] = [
  {
    id: "agent-architecture-001",
    domain: "agent-architecture",
    difficulty: "foundation",
    prompt:
      "A coordinator delegates document analysis to three specialised subagents. What is the safest way to give each subagent the context it needs?",
    choices: [
      {
        id: "a",
        text: "Pass the relevant document text, prior findings, and output requirements explicitly in each subagent task.",
      },
      { id: "b", text: "Assume every subagent can read the coordinator's full conversation history." },
      { id: "c", text: "Ask subagents to infer missing requirements from their names." },
      { id: "d", text: "Store hidden shared state outside the task prompts." },
    ],
    correctChoiceId: "a",
    explanation:
      "Subagents should receive the context they need explicitly. That keeps delegation observable and avoids relying on hidden or unavailable state.",
    choiceExplanations: {
      a: "Correct. Explicit context passing makes the task reproducible and auditable.",
      b: "Incorrect. Isolated agent contexts should not be assumed to inherit the coordinator history.",
      c: "Incorrect. Agent names are not a reliable substitute for task requirements.",
      d: "Incorrect. Hidden shared state makes behaviour harder to test and review.",
    },
    sources: [
      {
        title: "Claude docs: Intro to Claude",
        url: "https://platform.claude.com/docs/en/intro",
      },
    ],
  },
  {
    id: "tool-mcp-001",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt:
      "A Claude integration has two similar tools, `search_customer` and `lookup_order`. What most directly reduces incorrect tool selection?",
    choices: [
      {
        id: "a",
        text: "Write distinct tool descriptions that explain when each tool should be used and what it returns.",
      },
      { id: "b", text: "Give both tools short descriptions so the model has less context to process." },
      { id: "c", text: "Hide input constraints and validate only after execution." },
      { id: "d", text: "Use the same schema for every tool so selection is uniform." },
    ],
    correctChoiceId: "a",
    explanation:
      "Tool descriptions are a primary signal for tool choice. Distinct descriptions with usage guidance reduce ambiguity between overlapping tools.",
    choiceExplanations: {
      a: "Correct. Clear descriptions help the model choose the right tool.",
      b: "Incorrect. Overly terse descriptions increase ambiguity.",
      c: "Incorrect. Input constraints should be visible before the tool call.",
      d: "Incorrect. Uniform schemas do not explain semantic differences between tools.",
    },
    sources: [
      {
        title: "Claude docs: Tool use",
        url: "https://platform.claude.com/docs/en/build-with-claude/tool-use",
      },
    ],
  },
  {
    id: "structured-output-001",
    domain: "prompt-structured-output",
    difficulty: "foundation",
    prompt:
      "For an extraction workflow where some fields may be absent, which schema design best reduces fabrication?",
    choices: [
      { id: "a", text: "Make absent fields nullable and reserve required fields for data that is always available." },
      { id: "b", text: "Mark every field required so the model always returns complete JSON." },
      { id: "c", text: "Avoid schemas and ask for JSON in prose." },
      { id: "d", text: "Use free-text fields for all values." },
    ],
    correctChoiceId: "a",
    explanation:
      "Nullable fields allow the model to represent missing information directly instead of guessing. Required fields should be used only when the data is always present.",
    choiceExplanations: {
      a: "Correct. Nullable optional data supports honest absence.",
      b: "Incorrect. Required unavailable fields pressure the model to invent values.",
      c: "Incorrect. Prose JSON instructions are weaker than schema-constrained output.",
      d: "Incorrect. Free-text fields lose validation and increase ambiguity.",
    },
    sources: [
      {
        title: "Claude docs: Structured outputs",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
      },
    ],
  },
  {
    id: "context-reliability-001",
    domain: "context-reliability",
    difficulty: "applied",
    prompt:
      "A long-running support conversation accumulates large tool results. What should the architect do first to reduce context pressure?",
    choices: [
      { id: "a", text: "Return only fields the model needs and summarise older conversation state carefully." },
      { id: "b", text: "Append every raw API response forever." },
      { id: "c", text: "Remove the system prompt after the first turn." },
      { id: "d", text: "Ask the user to repeat all key facts each time." },
    ],
    correctChoiceId: "a",
    explanation:
      "Context includes tool results, system instructions, and message history. Reducing unnecessary tool output and carefully preserving important state lowers context pressure.",
    choiceExplanations: {
      a: "Correct. Smaller tool results and careful summarisation preserve useful context.",
      b: "Incorrect. Raw responses can quickly waste context.",
      c: "Incorrect. System instructions remain important across turns.",
      d: "Incorrect. The app should manage context rather than shifting that burden to the user.",
    },
    sources: [
      {
        title: "Claude docs: Context windows",
        url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
      },
    ],
  },
  {
    id: "claude-code-001",
    domain: "claude-code",
    difficulty: "foundation",
    prompt: "A team wants shared Claude Code instructions for a repository. Where should those instructions live?",
    choices: [
      {
        id: "a",
        text: "In a repository-level CLAUDE.md or project Claude configuration committed with the code.",
      },
      { id: "b", text: "Only in one developer's home-directory configuration." },
      { id: "c", text: "Only in the pull request description." },
      { id: "d", text: "In an untracked local note." },
    ],
    correctChoiceId: "a",
    explanation:
      "Shared project instructions should live with the repository so all contributors and agent sessions can use the same guidance.",
    choiceExplanations: {
      a: "Correct. Repository-level instructions are shared and reviewable.",
      b: "Incorrect. User-level configuration is personal and not shared with the team.",
      c: "Incorrect. Pull request descriptions are not persistent project instructions.",
      d: "Incorrect. Untracked notes are invisible to other contributors.",
    },
    sources: [
      {
        title: "Claude Code docs: Memory",
        url: "https://code.claude.com/docs/en/memory",
      },
    ],
  },
  {
    id: "agent-architecture-002",
    domain: "agent-architecture",
    difficulty: "scenario",
    prompt:
      "A customer-support agent can search tickets, update accounts, and issue refunds. Which architecture best reduces risk before allowing refund actions?",
    choices: [
      { id: "a", text: "Separate read-only lookup tools from state-changing tools and require explicit confirmation for refund execution." },
      { id: "b", text: "Expose one broad `manage_customer` tool that can perform every support action." },
      { id: "c", text: "Let the model decide whether refunds are sensitive based only on the user's tone." },
      { id: "d", text: "Hide refund capability inside the ticket search tool to simplify the tool list." },
    ],
    correctChoiceId: "a",
    explanation:
      "Architectures should make sensitive actions explicit, constrained, and reviewable. Separating read and write capabilities reduces accidental or over-broad tool use.",
    choiceExplanations: {
      a: "Correct. Clear capability boundaries and confirmation points reduce the blast radius of state-changing tools.",
      b: "Incorrect. A broad tool hides risk and gives the model more authority than the task requires.",
      c: "Incorrect. Sensitivity should be designed into the workflow, not inferred from sentiment.",
      d: "Incorrect. Hidden side effects make tool behaviour harder to audit and test.",
    },
    sources: [
      {
        title: "Claude docs: Tool use overview",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview",
      },
      {
        title: "Claude docs: Define tools",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools",
      },
    ],
  },
  {
    id: "agent-architecture-003",
    domain: "agent-architecture",
    difficulty: "applied",
    prompt:
      "A planner agent delegates research and drafting to subagents. What should the planner preserve to make the final answer auditable?",
    choices: [
      { id: "a", text: "The task given to each subagent, the evidence returned, and how those findings affected the final answer." },
      { id: "b", text: "Only the final answer, because intermediate work is implementation detail." },
      { id: "c", text: "Only the names of the subagents, because their names describe their responsibilities." },
      { id: "d", text: "A private scratchpad that cannot be shown to users or developers." },
    ],
    correctChoiceId: "a",
    explanation:
      "Delegated workflows are easier to review when the coordinator records task boundaries, evidence, and synthesis decisions.",
    choiceExplanations: {
      a: "Correct. This preserves enough traceability to inspect whether delegation was appropriate.",
      b: "Incorrect. The final answer alone does not show whether the workflow used reliable evidence.",
      c: "Incorrect. Names are not a substitute for concrete task instructions and outputs.",
      d: "Incorrect. Unavailable private state weakens observability and reproducibility.",
    },
    sources: [
      {
        title: "Claude Code docs: Subagents",
        url: "https://code.claude.com/docs/en/sub-agents",
      },
    ],
  },
  {
    id: "agent-architecture-004",
    domain: "agent-architecture",
    difficulty: "scenario",
    prompt:
      "A document-review workflow often exceeds context limits after many tool calls. Which design is most appropriate?",
    choices: [
      { id: "a", text: "Summarise durable findings, clear or compact stale tool results, and keep source references for claims." },
      { id: "b", text: "Keep every raw tool result in context so no information is ever removed." },
      { id: "c", text: "Drop the oldest user requirements first because tool output is always more reliable." },
      { id: "d", text: "Increase max output tokens and leave input context unchanged." },
    ],
    correctChoiceId: "a",
    explanation:
      "Long-running agent workflows need context curation. Durable summaries and source references preserve useful state while reducing token pressure.",
    choiceExplanations: {
      a: "Correct. It keeps important state while removing low-value context.",
      b: "Incorrect. Raw accumulation increases context pressure and can reduce recall quality.",
      c: "Incorrect. User requirements are often the highest-priority context.",
      d: "Incorrect. Output budget does not solve an overloaded input context.",
    },
    sources: [
      {
        title: "Claude docs: Context windows",
        url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
      },
    ],
  },
  {
    id: "agent-architecture-005",
    domain: "agent-architecture",
    difficulty: "applied",
    prompt:
      "A team wants an agent to decide when it has enough information to act. Which behaviour should the architect encourage for ambiguous requests?",
    choices: [
      { id: "a", text: "Ask a focused clarification question before using tools or making irreversible changes." },
      { id: "b", text: "Guess the missing parameters to keep the workflow fast." },
      { id: "c", text: "Call every available tool and infer the user's intent afterward." },
      { id: "d", text: "Return a refusal whenever any detail is missing." },
    ],
    correctChoiceId: "a",
    explanation:
      "Clarification is the right response when missing information materially affects the action. It avoids unsafe guesses without blocking valid work.",
    choiceExplanations: {
      a: "Correct. Targeted clarification improves reliability and user control.",
      b: "Incorrect. Guessing can produce incorrect or unsafe actions.",
      c: "Incorrect. Broad tool use can waste context, increase latency, and leak unnecessary data.",
      d: "Incorrect. Missing details usually call for clarification, not a blanket refusal.",
    },
    sources: [
      {
        title: "Claude docs: Define tools",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools",
      },
    ],
  },
  {
    id: "agent-architecture-006",
    domain: "agent-architecture",
    difficulty: "foundation",
    prompt:
      "Why is a narrow tool interface usually better than a general-purpose tool for an agentic workflow?",
    choices: [
      { id: "a", text: "It makes valid actions clearer and limits unintended behaviour." },
      { id: "b", text: "It prevents the model from needing any system prompt." },
      { id: "c", text: "It guarantees the model will never make a reasoning error." },
      { id: "d", text: "It removes the need to validate tool inputs." },
    ],
    correctChoiceId: "a",
    explanation:
      "Narrow tools express intent and constraints directly. They do not remove the need for prompts, validation, or evaluation, but they reduce ambiguity.",
    choiceExplanations: {
      a: "Correct. Tool boundaries are part of the workflow's safety and reliability design.",
      b: "Incorrect. System and developer instructions still matter.",
      c: "Incorrect. Interface design reduces risk but cannot guarantee perfect reasoning.",
      d: "Incorrect. Inputs still need schema validation and application checks.",
    },
    sources: [
      {
        title: "Claude docs: Define tools",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools",
      },
    ],
  },
  {
    id: "tool-mcp-002",
    domain: "tool-mcp",
    difficulty: "foundation",
    prompt: "In MCP terminology, which primitive should expose an action Claude can choose to invoke?",
    choices: [
      { id: "a", text: "A tool." },
      { id: "b", text: "A resource." },
      { id: "c", text: "A prompt." },
      { id: "d", text: "A transcript." },
    ],
    correctChoiceId: "a",
    explanation:
      "MCP tools represent callable actions. Resources expose contextual data, and prompts provide reusable prompt templates.",
    choiceExplanations: {
      a: "Correct. Tools are the MCP primitive for actions.",
      b: "Incorrect. Resources provide data or context rather than executable actions.",
      c: "Incorrect. Prompts package reusable instructions, not arbitrary actions.",
      d: "Incorrect. A transcript is conversation history, not an MCP primitive.",
    },
    sources: [
      {
        title: "Anthropic Academy: Intro to Model Context Protocol",
        url: "https://anthropic.skilljar.com/",
      },
    ],
  },
  {
    id: "tool-mcp-003",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt:
      "A tool requires `customer_id` and an optional `include_orders` flag. Which schema design is best?",
    choices: [
      { id: "a", text: "Declare `customer_id` as required, type the flag as boolean, and describe the flag's effect." },
      { id: "b", text: "Accept one free-form string and parse both values from it later." },
      { id: "c", text: "Mark every field optional so the model has maximum flexibility." },
      { id: "d", text: "Use vague property names like `value1` and `value2` to keep the schema generic." },
    ],
    correctChoiceId: "a",
    explanation:
      "Tool input schemas should expose the parameters the tool needs, with accurate types and descriptions that help Claude provide valid inputs.",
    choiceExplanations: {
      a: "Correct. Required fields, precise types, and descriptions improve tool-call reliability.",
      b: "Incorrect. Free-form parsing weakens validation and increases ambiguity.",
      c: "Incorrect. Required fields should be marked required when the tool cannot run without them.",
      d: "Incorrect. Generic names make it harder for the model to map user intent to inputs.",
    },
    sources: [
      {
        title: "Claude docs: Define tools",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools",
      },
    ],
  },
  {
    id: "tool-mcp-004",
    domain: "tool-mcp",
    difficulty: "scenario",
    prompt:
      "A travel assistant needs flight search and hotel search. What is the best reason to keep these as separate tools?",
    choices: [
      { id: "a", text: "The required inputs, returned data, and invocation conditions differ." },
      { id: "b", text: "Claude can only use one tool per application." },
      { id: "c", text: "Separate tools remove the need for source citations." },
      { id: "d", text: "Tool names are ignored, so separation is only cosmetic." },
    ],
    correctChoiceId: "a",
    explanation:
      "Tools should map to distinct capabilities with clear descriptions and schemas. Different actions usually deserve separate interfaces.",
    choiceExplanations: {
      a: "Correct. Distinct capabilities are easier for Claude to select and call correctly.",
      b: "Incorrect. Claude can work with multiple tools.",
      c: "Incorrect. Tool design does not remove evidence or citation requirements.",
      d: "Incorrect. Tool names and descriptions are important selection signals.",
    },
    sources: [
      {
        title: "Claude docs: Tool use overview",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview",
      },
    ],
  },
  {
    id: "tool-mcp-005",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt:
      "When should an architect consider strict tool use or structured output constraints?",
    choices: [
      { id: "a", text: "When downstream code depends on valid JSON or schema-compliant tool inputs." },
      { id: "b", text: "Only when the app has no automated tests." },
      { id: "c", text: "Whenever prose output would be more readable to a human." },
      { id: "d", text: "Only for prompts that do not use tools." },
    ],
    correctChoiceId: "a",
    explanation:
      "Strict schemas are useful when application code needs reliable structure. They complement tests and tool design rather than replacing them.",
    choiceExplanations: {
      a: "Correct. Schema constraints protect downstream parsing and tool execution paths.",
      b: "Incorrect. Tests are still needed even with schema constraints.",
      c: "Incorrect. Human readability is not the primary reason for strict schemas.",
      d: "Incorrect. Structured outputs and strict tool use can be used in agentic workflows.",
    },
    sources: [
      {
        title: "Claude docs: Structured outputs",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
      },
    ],
  },
  {
    id: "tool-mcp-006",
    domain: "tool-mcp",
    difficulty: "scenario",
    prompt:
      "A filesystem MCP server exposes file reads and writes. Which production concern should be handled first?",
    choices: [
      { id: "a", text: "Restrict accessible paths and require clear authorization for write operations." },
      { id: "b", text: "Let the model read any path so it can discover context automatically." },
      { id: "c", text: "Combine read and write into one unconstrained tool for speed." },
      { id: "d", text: "Disable tool descriptions so users cannot see capabilities." },
    ],
    correctChoiceId: "a",
    explanation:
      "MCP servers that touch local or external systems need explicit capability boundaries, especially around destructive or sensitive operations.",
    choiceExplanations: {
      a: "Correct. Path scoping and write authorization reduce security and reliability risk.",
      b: "Incorrect. Broad file access can expose unrelated or sensitive data.",
      c: "Incorrect. Combining capabilities obscures risk and weakens control.",
      d: "Incorrect. Hidden capabilities make review and correct tool selection harder.",
    },
    sources: [
      {
        title: "Anthropic Academy: Model Context Protocol advanced topics",
        url: "https://anthropic.skilljar.com/",
      },
    ],
  },
  {
    id: "claude-code-002",
    domain: "claude-code",
    difficulty: "applied",
    prompt:
      "A repository has repeated build and test instructions that every Claude Code session should know. What is the best place to document them?",
    choices: [
      { id: "a", text: "A project-level `CLAUDE.md` committed with the repository." },
      { id: "b", text: "A private chat message in one previous session." },
      { id: "c", text: "A local-only file that is intentionally untracked." },
      { id: "d", text: "The package lockfile." },
    ],
    correctChoiceId: "a",
    explanation:
      "Project-level Claude Code memory gives future sessions shared, reviewable instructions such as commands, conventions, and layout notes.",
    choiceExplanations: {
      a: "Correct. Shared repository instructions are visible to the team and loaded for the project.",
      b: "Incorrect. Prior chat context is not a reliable project instruction source.",
      c: "Incorrect. Local-only notes are not shared with collaborators.",
      d: "Incorrect. Lockfiles are dependency metadata, not agent instructions.",
    },
    sources: [
      {
        title: "Claude Code docs: Memory",
        url: "https://code.claude.com/docs/en/memory",
      },
    ],
  },
  {
    id: "claude-code-003",
    domain: "claude-code",
    difficulty: "scenario",
    prompt:
      "A large codebase has independent frontend, backend, and data-model investigation tasks. How can Claude Code keep the main conversation focused?",
    choices: [
      { id: "a", text: "Delegate independent investigations to specialised subagents with explicit tasks and expected outputs." },
      { id: "b", text: "Ask one subagent to inspect everything without a task boundary." },
      { id: "c", text: "Paste every file into the main conversation before deciding what matters." },
      { id: "d", text: "Avoid subagents because they cannot be given instructions." },
    ],
    correctChoiceId: "a",
    explanation:
      "Subagents are useful for scoped, independent work. Clear task prompts and expected outputs help preserve focus and reduce context overload.",
    choiceExplanations: {
      a: "Correct. Scoped delegation keeps the coordinator focused while preserving useful findings.",
      b: "Incorrect. Unbounded delegation makes findings noisy and harder to trust.",
      c: "Incorrect. Loading everything into the main context wastes tokens.",
      d: "Incorrect. Subagents can be given explicit task instructions.",
    },
    sources: [
      {
        title: "Claude Code docs: Subagents",
        url: "https://code.claude.com/docs/en/sub-agents",
      },
    ],
  },
  {
    id: "claude-code-004",
    domain: "claude-code",
    difficulty: "foundation",
    prompt: "What type of content belongs in a project `CLAUDE.md`?",
    choices: [
      { id: "a", text: "Stable project facts such as build commands, test commands, conventions, and architecture notes." },
      { id: "b", text: "Temporary credentials for the current developer." },
      { id: "c", text: "Large generated logs from every previous task." },
      { id: "d", text: "One-off instructions that only applied to a single command yesterday." },
    ],
    correctChoiceId: "a",
    explanation:
      "Claude Code memory should contain concise, stable instructions that future sessions and teammates benefit from.",
    choiceExplanations: {
      a: "Correct. Stable project guidance is exactly what shared memory is for.",
      b: "Incorrect. Secrets should not be committed to project memory.",
      c: "Incorrect. Large logs waste context and are not stable instructions.",
      d: "Incorrect. One-off instructions should stay in the task conversation, not persistent memory.",
    },
    sources: [
      {
        title: "Claude Code docs: Memory",
        url: "https://code.claude.com/docs/en/memory",
      },
    ],
  },
  {
    id: "claude-code-005",
    domain: "claude-code",
    difficulty: "applied",
    prompt:
      "A team wants Claude Code to run formatting after edits but never auto-deploy. Which extension point best fits this kind of local automation?",
    choices: [
      { id: "a", text: "Use hooks for bounded local commands and keep deployment as an explicit human-controlled step." },
      { id: "b", text: "Put deployment credentials in `CLAUDE.md` so Claude can decide when to deploy." },
      { id: "c", text: "Ask Claude to remember the rule from a previous chat only." },
      { id: "d", text: "Disable all verification because hooks replace tests." },
    ],
    correctChoiceId: "a",
    explanation:
      "Hooks can automate predictable local workflow steps. Sensitive actions such as deployment should remain explicit and controlled.",
    choiceExplanations: {
      a: "Correct. This automates low-risk checks without granting broad production authority.",
      b: "Incorrect. Secrets and deployment authority should not be placed in shared instructions.",
      c: "Incorrect. Previous chat memory is not a reliable team control.",
      d: "Incorrect. Hooks can run checks, but they do not replace verification discipline.",
    },
    sources: [
      {
        title: "Claude Code docs: Hooks",
        url: "https://code.claude.com/docs/en/hooks",
      },
    ],
  },
  {
    id: "claude-code-006",
    domain: "claude-code",
    difficulty: "scenario",
    prompt:
      "Claude Code repeatedly makes the same incorrect assumption about a repository's test command. What should the team do?",
    choices: [
      { id: "a", text: "Add the correct command and context to shared project memory." },
      { id: "b", text: "Rely on each developer to correct Claude manually every time." },
      { id: "c", text: "Remove tests from the workflow to avoid confusion." },
      { id: "d", text: "Put the command only in a private local note." },
    ],
    correctChoiceId: "a",
    explanation:
      "Repeated corrections are a signal that the information should become durable project guidance.",
    choiceExplanations: {
      a: "Correct. Shared memory prevents repeated correction and helps all sessions use the right command.",
      b: "Incorrect. Manual repetition wastes time and invites inconsistency.",
      c: "Incorrect. Removing tests weakens engineering quality.",
      d: "Incorrect. Private notes do not help the team or future shared sessions.",
    },
    sources: [
      {
        title: "Claude Code docs: Memory",
        url: "https://code.claude.com/docs/en/memory",
      },
    ],
  },
  {
    id: "prompt-structured-output-002",
    domain: "prompt-structured-output",
    difficulty: "foundation",
    prompt: "Before improving a prompt, what should an architect define first?",
    choices: [
      { id: "a", text: "Success criteria and a way to evaluate whether the output meets them." },
      { id: "b", text: "The longest possible prompt so Claude has maximum text." },
      { id: "c", text: "A fixed model response that should be copied every time." },
      { id: "d", text: "A plan to remove all examples from the prompt." },
    ],
    correctChoiceId: "a",
    explanation:
      "Prompt engineering should start from clear success criteria and empirical checks. Otherwise changes cannot be judged reliably.",
    choiceExplanations: {
      a: "Correct. Evaluation criteria make prompt changes measurable.",
      b: "Incorrect. More prompt text is not automatically better.",
      c: "Incorrect. A fixed response does not handle varied inputs.",
      d: "Incorrect. Examples are often useful when chosen carefully.",
    },
    sources: [
      {
        title: "Claude docs: Prompt engineering overview",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
      },
    ],
  },
  {
    id: "prompt-structured-output-003",
    domain: "prompt-structured-output",
    difficulty: "applied",
    prompt:
      "A classifier must return one of three labels for downstream routing. Which output design is strongest?",
    choices: [
      { id: "a", text: "Use a structured schema with an enum-like label field and a short rationale field." },
      { id: "b", text: "Ask for a paragraph and parse the label with string contains checks." },
      { id: "c", text: "Let the model invent labels when none fit exactly." },
      { id: "d", text: "Return Markdown headings because they look clean to users." },
    ],
    correctChoiceId: "a",
    explanation:
      "Downstream routing benefits from constrained, parseable output. A rationale can help debugging without weakening the label contract.",
    choiceExplanations: {
      a: "Correct. It gives application code a reliable field to consume.",
      b: "Incorrect. String parsing prose is brittle.",
      c: "Incorrect. Invented labels break routing contracts.",
      d: "Incorrect. Markdown presentation is not a reliable machine interface.",
    },
    sources: [
      {
        title: "Claude docs: Structured outputs",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
      },
    ],
  },
  {
    id: "prompt-structured-output-004",
    domain: "prompt-structured-output",
    difficulty: "scenario",
    prompt:
      "A summarisation prompt gives inconsistent formats across runs. What should the architect try before changing models?",
    choices: [
      { id: "a", text: "Clarify the required structure, add representative examples, and evaluate outputs against the target format." },
      { id: "b", text: "Remove all formatting instructions to avoid constraining Claude." },
      { id: "c", text: "Increase temperature so the model explores more formats." },
      { id: "d", text: "Ask users to manually reformat every answer." },
    ],
    correctChoiceId: "a",
    explanation:
      "Clear instructions, examples, and evaluation are prompt-level controls for consistency. Model changes may help, but should not be the first lever for a vague prompt.",
    choiceExplanations: {
      a: "Correct. It directly addresses ambiguity and measures whether the fix works.",
      b: "Incorrect. Less structure usually increases format variance.",
      c: "Incorrect. Higher randomness can make consistency worse.",
      d: "Incorrect. The workflow should produce usable output without manual repair.",
    },
    sources: [
      {
        title: "Claude docs: Prompting best practices",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-best-practices",
      },
    ],
  },
  {
    id: "prompt-structured-output-005",
    domain: "prompt-structured-output",
    difficulty: "applied",
    prompt:
      "For a prompt that asks Claude to extract facts from a policy document, which instruction helps reduce hallucinated fields?",
    choices: [
      { id: "a", text: "Tell Claude to use `null` for missing values and only extract information supported by the document." },
      { id: "b", text: "Require every field to be filled with a confident-looking answer." },
      { id: "c", text: "Ask Claude to infer missing policy details from industry norms." },
      { id: "d", text: "Remove the source document after the first example." },
    ],
    correctChoiceId: "a",
    explanation:
      "Allowing explicit absence and grounding extraction in the provided document reduces pressure to fabricate missing information.",
    choiceExplanations: {
      a: "Correct. It gives the model a valid way to represent missing evidence.",
      b: "Incorrect. Required unsupported fields encourage fabrication.",
      c: "Incorrect. External norms are not evidence from the provided document.",
      d: "Incorrect. The source is necessary grounding context.",
    },
    sources: [
      {
        title: "Claude docs: Structured outputs",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
      },
    ],
  },
  {
    id: "prompt-structured-output-006",
    domain: "prompt-structured-output",
    difficulty: "foundation",
    prompt: "Why include examples in a prompt?",
    choices: [
      { id: "a", text: "They show the desired style, structure, and decision boundary more concretely than prose alone." },
      { id: "b", text: "They guarantee the model will ignore all system instructions." },
      { id: "c", text: "They remove the need for evaluation." },
      { id: "d", text: "They are only useful for image inputs." },
    ],
    correctChoiceId: "a",
    explanation:
      "Examples can demonstrate expected behaviour and reduce misinterpretation, especially when the output format or classification boundary matters.",
    choiceExplanations: {
      a: "Correct. Good examples make requirements concrete.",
      b: "Incorrect. Examples do not override higher-priority instructions.",
      c: "Incorrect. Examples and evaluations solve different problems.",
      d: "Incorrect. Examples are useful across many text workflows.",
    },
    sources: [
      {
        title: "Anthropic prompt engineering tutorial",
        url: "https://github.com/anthropics/prompt-eng-interactive-tutorial",
      },
    ],
  },
  {
    id: "context-reliability-002",
    domain: "context-reliability",
    difficulty: "foundation",
    prompt: "What does the context window represent in a Claude API workflow?",
    choices: [
      { id: "a", text: "The working text Claude can reference for the current generation, including conversation and tool context." },
      { id: "b", text: "The full training dataset used to create Claude." },
      { id: "c", text: "Only the user's latest message." },
      { id: "d", text: "Only the maximum number of output tokens." },
    ],
    correctChoiceId: "a",
    explanation:
      "The context window is Claude's working memory for a request. It is separate from training data and includes more than just output budget.",
    choiceExplanations: {
      a: "Correct. Context is the request-time working memory available to the model.",
      b: "Incorrect. Training data is not the same as request context.",
      c: "Incorrect. Prior messages, instructions, and tool results can also be in context.",
      d: "Incorrect. Output token budget is only part of request sizing.",
    },
    sources: [
      {
        title: "Claude docs: Context windows",
        url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
      },
    ],
  },
  {
    id: "context-reliability-003",
    domain: "context-reliability",
    difficulty: "applied",
    prompt:
      "A workflow repeatedly sends the same large system instructions and reference material. Which feature may reduce latency and cost?",
    choices: [
      { id: "a", text: "Prompt caching for stable reusable context." },
      { id: "b", text: "Increasing output tokens on every request." },
      { id: "c", text: "Removing all instructions after the first request." },
      { id: "d", text: "Turning every instruction into a user message." },
    ],
    correctChoiceId: "a",
    explanation:
      "Prompt caching is designed for stable repeated context. It does not replace good context design, but it can improve repeated-request economics.",
    choiceExplanations: {
      a: "Correct. Stable shared prefixes are a good fit for caching.",
      b: "Incorrect. More output budget does not reduce repeated input cost.",
      c: "Incorrect. Required instructions still need to be present or otherwise managed.",
      d: "Incorrect. Message role changes do not solve repeated context cost.",
    },
    sources: [
      {
        title: "Claude docs: Prompt caching",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
      },
    ],
  },
  {
    id: "context-reliability-004",
    domain: "context-reliability",
    difficulty: "scenario",
    prompt:
      "An app starts failing under high load with rate-limit errors. What is the most appropriate architectural response?",
    choices: [
      { id: "a", text: "Add backoff, queueing or throttling, and design user-visible retry behaviour." },
      { id: "b", text: "Immediately retry every failed request in a tight loop." },
      { id: "c", text: "Increase prompt length so each request contains more detail." },
      { id: "d", text: "Ignore the error because rate limits are unrelated to architecture." },
    ],
    correctChoiceId: "a",
    explanation:
      "Production Claude integrations should handle rate limits and transient failures deliberately with retry and traffic-shaping strategies.",
    choiceExplanations: {
      a: "Correct. Backoff and queueing protect both the app and upstream service.",
      b: "Incorrect. Tight retry loops worsen load and can extend outages.",
      c: "Incorrect. Larger prompts increase pressure rather than addressing rate limits.",
      d: "Incorrect. Error handling is a core reliability concern.",
    },
    sources: [
      {
        title: "Claude docs: Rate limits",
        url: "https://platform.claude.com/docs/en/api/rate-limits",
      },
    ],
  },
  {
    id: "context-reliability-005",
    domain: "context-reliability",
    difficulty: "applied",
    prompt:
      "A RAG answer cites snippets that do not support its claims. Which evaluation should be added?",
    choices: [
      { id: "a", text: "Check whether each generated claim is supported by retrieved evidence." },
      { id: "b", text: "Only count whether the answer is written in a friendly tone." },
      { id: "c", text: "Measure the number of tokens in the answer and ignore source quality." },
      { id: "d", text: "Accept any answer if it includes at least one URL." },
    ],
    correctChoiceId: "a",
    explanation:
      "For grounded workflows, reliability depends on claim support, not just citation presence or style.",
    choiceExplanations: {
      a: "Correct. Evidence support is the relevant quality criterion.",
      b: "Incorrect. Tone does not prove factual grounding.",
      c: "Incorrect. Token length is not evidence quality.",
      d: "Incorrect. A URL alone does not show that claims are supported.",
    },
    sources: [
      {
        title: "Claude docs: Define success and build evaluations",
        url: "https://platform.claude.com/docs/en/build-with-claude/test-and-evaluate/define-success",
      },
    ],
  },
  {
    id: "context-reliability-006",
    domain: "context-reliability",
    difficulty: "scenario",
    prompt:
      "A workflow can answer either from current user-provided documents or from general model knowledge. Which instruction improves reliability when documents are required?",
    choices: [
      { id: "a", text: "Require answers to be grounded in the provided documents and state when the documents do not contain enough information." },
      { id: "b", text: "Tell Claude to always answer confidently even when documents are incomplete." },
      { id: "c", text: "Remove document references from the prompt to reduce token usage." },
      { id: "d", text: "Ask Claude to prefer plausible answers over source-backed answers." },
    ],
    correctChoiceId: "a",
    explanation:
      "Grounded workflows need an explicit policy for missing evidence. Allowing uncertainty is safer than forcing unsupported answers.",
    choiceExplanations: {
      a: "Correct. It aligns the response with available evidence and permits honest uncertainty.",
      b: "Incorrect. Forced confidence increases hallucination risk.",
      c: "Incorrect. Removing the documents removes the grounding source.",
      d: "Incorrect. Plausibility is weaker than source support.",
    },
    sources: [
      {
        title: "Claude docs: Reduce hallucinations",
        url: "https://platform.claude.com/docs/en/build-with-claude/strengthen-guardrails/reduce-hallucinations",
      },
    ],
  },
];
