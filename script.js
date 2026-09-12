
// ---------- Reserved words (Grammar vocabulary) ----------
const KEYWORDS = ["i", "was", "on", "my", "attendance", "marked", "present", "absent"];
const STATUS_WORDS = ["present", "absent"];
const OPERATORS = ["but", "however", "although", "and", "yet"];

// ---------- Connect HTML elements to JavaScript ----------
const issueInput = document.getElementById("issueInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const tokenBody = document.getElementById("tokenBody");
const syntaxVerdict = document.getElementById("syntaxVerdict");
const syntaxErrors = document.getElementById("syntaxErrors");
const terminal = document.getElementById("terminal");
const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const resultDetail = document.getElementById("resultDetail");

// =========================================================
// PHASE 1: LEXICAL ANALYSIS
// =========================================================
function tokenize(text) {
  // Pattern: match Date first, then words, then numbers, then remaining symbols
  const pattern = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|[A-Za-z]+|\d+|[^\sA-Za-z0-9]/g;
  const rawMatches = text.match(pattern) || [];

  return rawMatches.map((lexeme) => ({
    lexeme: lexeme,
    type: classify(lexeme)
  }));
}

function classify(lexeme) {
  const lower = lexeme.toLowerCase();

  if (/^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}$/.test(lexeme)) return "Date";
  if (/^\d+$/.test(lexeme)) return "Number";
  if (OPERATORS.includes(lower)) return "Operator";
  if (KEYWORDS.includes(lower)) return "Keyword";
  if (/^[A-Za-z]+$/.test(lexeme)) return "Identifier";
  return "Other";
}

function renderTokenTable(tokens) {
  // Clear old rows first
  tokenBody.innerHTML = "";

  if (tokens.length === 0) {
    tokenBody.innerHTML = "<tr><td colspan='3'>No tokens found.</td></tr>";
    return;
  }

  tokens.forEach((tok, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>T${index + 1}</td>
      <td>${tok.lexeme}</td>
      <td>${tok.type}</td>
    `;
    tokenBody.appendChild(row);
  });
}

// =========================================================
// PHASE 2: PARSER + SYNTAX ANALYSIS
// Grammar:
//   <ISSUE>    -> <CLAIM> <OPERATOR> <REPORT>
//   <CLAIM>    -> "I" "was" <STATUS> "on" <DATE>
//   <REPORT>   -> "my" "attendance" "was" "marked" <STATUS>
// =========================================================
function parse(tokens) {
  const errors = [];

  if (tokens.length === 0) {
    return { valid: false, errors: ["Input is empty."], dates: [], statuses: [] };
  }

  const dateTokens = tokens.filter(t => t.type === "Date");
  const statusTokens = tokens.filter(t => STATUS_WORDS.includes(t.lexeme.toLowerCase()));
  const operatorTokens = tokens.filter(t => t.type === "Operator");
  const hasAttendance = tokens.some(t => t.lexeme.toLowerCase() === "attendance");
  const hasMarked = tokens.some(t => t.lexeme.toLowerCase() === "marked");

  if (dateTokens.length === 0) {
    errors.push("DATE token not found. A date is required, e.g. 09/09/2026");
  }
  if (statusTokens.length < 2) {
    errors.push("Two STATUS words are required (present/absent) — one claimed, one marked.");
  }
  if (operatorTokens.length === 0) {
    errors.push("OPERATOR not found. A connector like 'but' or 'however' is required.");
  }
  if (!hasAttendance) {
    errors.push("Keyword 'attendance' is missing.");
  }
  if (!hasMarked) {
    errors.push("Keyword 'marked' is missing.");
  }

  return {
    valid: errors.length === 0,
    errors: errors,
    dates: dateTokens,
    statuses: statusTokens
  };
}

function showParseResult(parseResult) {
  if (parseResult.valid) {
    syntaxVerdict.textContent = "✓ Valid Attendance Issue";
    syntaxVerdict.className = "";
    syntaxVerdict.classList.add("result-valid");
    syntaxErrors.innerHTML = "";
  } else {
    syntaxVerdict.textContent = "✗ Invalid Syntax";
    syntaxVerdict.className = "";
    syntaxVerdict.classList.add("result-invalid");
    syntaxErrors.innerHTML = parseResult.errors
      .map(e => `<li>${e}</li>`)
      .join("");
  }
}

// =========================================================
// PHASE 3: ANALYTICAL TERMINAL
// =========================================================
function runTerminal(steps, onDone) {
  terminal.innerHTML = "";
  let i = 0;

  function printNext() {
    if (i >= steps.length) {
      if (onDone) onDone();
      return;
    }
    const line = document.createElement("p");
    line.textContent = steps[i];
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
    i++;
    setTimeout(printNext, 300);
  }

  printNext();
}

// =========================================================
// MAIN FLOW — Runs when "Analyze Issue" button is clicked
// =========================================================
function analyze() {
  const text = issueInput.value.trim();

  // If empty, show an error immediately
  if (text === "") {
    renderTokenTable([]);
    runTerminal(["Input is empty.", "Analysis stopped."]);
    resultTitle.textContent = "Invalid Attendance Issue";
    resultDetail.textContent = "Please enter a complaint first.";
    resultCard.className = "";
    resultCard.classList.add("result-invalid");
    return;
  }

  // Phase 1: Lexer
  const tokens = tokenize(text);
  renderTokenTable(tokens);

  // Phase 2: Parser
  const parseResult = parse(tokens);
  showParseResult(parseResult);

  // Build the list of steps for the terminal
  const steps = [
    "Starting Lexical Analysis...",
    "Input received.",
    "Generating tokens...",
    `Tokens generated successfully. (${tokens.length} tokens)`,
    "Starting Parser...",
    "Checking grammar rules...",
  ];

  if (parseResult.valid) {
    steps.push("Syntax Analysis completed.");
    steps.push("Attendance Issue Accepted.");
  } else {
    steps.push("Syntax Analysis completed with errors.");
    steps.push("Attendance Issue Rejected.");
  }

  // Phase 3: Run the terminal, then show the Final Result once it finishes
  runTerminal(steps, () => {
    if (parseResult.valid) {
      const dateFound = parseResult.dates[0]?.lexeme || "unknown date";
      const claimed = parseResult.statuses[0]?.lexeme || "?";
      const marked = parseResult.statuses[parseResult.statuses.length - 1]?.lexeme || "?";

      resultTitle.textContent = "✓ Attendance Issue Accepted";
      resultDetail.textContent = `On ${dateFound}, the student claimed "${claimed}" but was marked "${marked}".`;
      resultCard.className = "";
      resultCard.classList.add("result-valid");
    } else {
      resultTitle.textContent = "✗ Invalid Attendance Issue";
      resultDetail.textContent = "The complaint does not follow the grammar. See the errors above.";
      resultCard.className = "";
      resultCard.classList.add("result-invalid");
    }
  });
}

// Attach the click event to the button
analyzeBtn.addEventListener("click", analyze);
