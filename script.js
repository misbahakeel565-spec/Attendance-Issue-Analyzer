* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #F3F5FA;
  color: #1B1F2A;
  margin: 0;
  padding: 20px;
  line-height: 1.6;
}

h1, h2, h3 {
  color: #16213E;
}

textarea {
  width: 100%;
  max-width: 600px;
  padding: 12px;
  border: 1.5px solid #E2E6EF;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #2E5AAC;
}

button {
  background-color: #B98B2A;
  color: #1B1300;
  border: none;
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background-color: #96701E;
}
table {
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
  margin-top: 12px;
  font-size: 14px;
  background-color: #FFFFFF;
}

thead th {
  text-align: left;
  background-color: #16213E;
  color: #ffffff;
  padding: 10px;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #E2E6EF;
}

tbody tr:hover {
  background-color: #F7F8FC;
}
pre {
  background-color: #F7F8FC;
  border: 1px solid #E2E6EF;
  border-left: 4px solid #B98B2A;
  border-radius: 8px;
  padding: 14px 16px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #2C3550;
  overflow-x: auto;
  max-width: 600px;
}

#syntaxVerdict {
  font-weight: 700;
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 600px;
  background-color: #F1F2F6;
  color: #5B6472;
}

#syntaxErrors {
  color: #C0392B;
  max-width: 600px;
}

#terminal {
  background-color: #0D1117;
  color: #C9D1D9;
  border-radius: 8px;
  padding: 16px 18px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  max-width: 600px;
  min-height: 100px;
  max-height: 250px;
  overflow-y: auto;
}

#terminal p {
  margin: 0 0 6px 0;
}
#resultCard {
  max-width: 600px;
  padding: 20px;
  border-radius: 12px;
  border: 1.5px solid #E2E6EF;
  background-color: #F1F2F6;
  margin-top: 10px;
}

#resultCard h3 {
  margin: 0 0 6px 0;
}

#resultCard p {
  margin: 0;
  color: #5B6472;
}

/* These classes are added/removed dynamically by JavaScript */
.result-valid {
  background-color: #E7F6ED !important;
  border-color: #BEE6CC !important;
}

.result-valid h3 {
  color: #1F8A56;
}

.result-invalid {
  background-color: #FBEAEA !important;
  border-color: #F1C4C1 !important;
}

.result-invalid h3 {
  color: #C0392B;
}
