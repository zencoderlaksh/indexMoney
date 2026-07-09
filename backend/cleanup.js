const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../frontend/src/pages/dashboard/AdminDashboardPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove states for todaysResults and performance
content = content.replace(/const defaultTodaysResults = \[[\s\S]*?\];/g, '');
content = content.replace(/const \[todaysResults[\s\S]*?\}\);/g, '');

// Remove load functions
content = content.replace(/const loadHomepage = React\.useCallback\([\s\S]*?\}, \[\]\);/g, '');
content = content.replace(/const loadPerformance = React\.useCallback\([\s\S]*?\}, \[\]\);/g, '');

// Remove save functions
content = content.replace(/const saveHomepageResults = async \(\) => \{[\s\S]*?^\s*};/m, '');
content = content.replace(/const uploadSheet = async \(kind\) => \{[\s\S]*?^\s*};/m, '');
content = content.replace(/const handlePerformanceChange = \(e\) => \{[\s\S]*?^\s*};/m, '');
content = content.replace(/const savePerformanceTrade = async \(\) => \{[\s\S]*?^\s*};/m, '');
content = content.replace(/const deletePerformanceTrade = async \(trade\) => \{[\s\S]*?^\s*};/m, '');
content = content.replace(/const editPerformanceTrade = \(trade\) => \{[\s\S]*?^\s*};/m, '');

// Remove from useEffect
content = content.replace(/loadHomepage\(\);\s*loadPerformance\(\);/g, '');
content = content.replace(/loadHomepage,\s*loadPerformance,/g, '');

// Remove the JSX block
const jsxStart = `<div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_1fr]">`;
const jsxEndStr = `</section>\n        </div>`;

const startIndex = content.indexOf(jsxStart);
if (startIndex !== -1) {
  // Find the closing </div> of that section
  // It's followed by <div className="mt-8"> for Unlisted Shares CMS
  const nextSectionStart = content.indexOf(`<div className="mt-8">\n          <section id="unlisted-form-section"`, startIndex);
  if (nextSectionStart !== -1) {
    content = content.substring(0, startIndex) + content.substring(nextSectionStart);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleanup script finished.');
