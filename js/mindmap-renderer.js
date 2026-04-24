/**
 * IELTS with Kee — Mindmap Renderer
 * Renders the IELTS Speaking mindmap JSON as an interactive HTML tree
 */

(function() {
  'use strict';

  const MIN_CHILDREN_TO_COLLAPSE = 3;
  const MAX_DEPTH = 5;

  // Color scheme per top-level branch
  const BRANCH_STYLES = {
    'Structure': { bg: 'linear-gradient(135deg, #7c4dff, #651fff)', color: '#fff' },
    'Grading': { bg: 'linear-gradient(135deg, #FF2442, #d32f2f)', color: '#fff' },
    'Skills': { bg: 'linear-gradient(135deg, #00bcd4, #0097a7)', color: '#fff' },
    'Vocab': { bg: 'linear-gradient(135deg, #ff9800, #f57c00)', color: '#fff' },
    'Discourse Markers': { bg: 'linear-gradient(135deg, #4caf50, #388e3c)', color: '#fff' },
    'Pronunciation': { bg: 'linear-gradient(135deg, #e91e63, #c2185b)', color: '#fff' },
    'Question Pool': { bg: 'linear-gradient(135deg, #FFD700, #f9a825)', color: '#222' },
    'Checklists for Trains of Thoughts': { bg: 'linear-gradient(135deg, #9c27b0, #7b1fa2)', color: '#fff' },
  };

  function getBranchClass(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function getBranchStyle(title) {
    for (const [key, style] of Object.entries(BRANCH_STYLES)) {
      if (title === key || title.startsWith(key)) return style;
    }
    return { bg: 'linear-gradient(135deg, #9F44D3, #7a2ea8)', color: '#fff' };
  }

  /**
   * Strip HTML tags from content
   */
  function stripHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  /**
   * Recursively build child items from a topic node
   */
  function buildChildren(parentEl, children, depth) {
    if (!children || !children.attached || children.attached.length === 0) return;
    if (depth >= MAX_DEPTH) return;

    children.attached.forEach(child => {
      const title = child.title || '';
      const hasChildren = child.children && child.children.attached && child.children.attached.length > 0;

      const item = document.createElement('div');
      item.className = depth <= 2 ? 'mm-sub-branch' : 'mm-item';

      if (depth <= 2) {
        item.classList.add(`depth-${depth}`);

        const titleEl = document.createElement('div');
        titleEl.className = 'mm-sub-title';
        titleEl.textContent = stripHTML(title);
        item.appendChild(titleEl);

        if (hasChildren) {
          const subContainer = document.createElement('div');
          // Collapse if many items at depth 3+
          const shouldCollapse = depth >= 1 && child.children.attached.length >= MIN_CHILDREN_TO_COLLAPSE;
          subContainer.className = 'mm-sub-items' + (shouldCollapse ? ' collapsed' : '');
          titleEl.style.cursor = 'pointer';
          titleEl.addEventListener('click', (e) => {
            e.stopPropagation();
            subContainer.classList.toggle('collapsed');
          });
          item.appendChild(subContainer);
          buildChildren(subContainer, child.children, depth + 1);
        }
      } else {
        // Render parsed attributed title with bold markers
        const raw = child.attributedTitle || [{ text: title }];
        const parts = raw.map(p => {
          if (p['fo:font-weight'] === '700') {
            return `<strong>${escapeHTML(p.text)}</strong>`;
          }
          return escapeHTML(p.text);
        });
        item.innerHTML = parts.join('');
        parentEl.appendChild(item);
      }

      if (item.parentNode === null) {
        parentEl.appendChild(item);
      }
    });
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Render the full mindmap into a container element
   */
  function renderMindmap(container, data) {
    container.innerHTML = '';
    container.className = 'mindmap-tree';

    const sheet = data[0];
    if (!sheet || !sheet.rootTopic) {
      container.innerHTML = '<div class="error-msg">⚠️ Could not parse mindmap data.</div>';
      return;
    }

    const root = sheet.rootTopic;
    const mainBranches = root.children && root.children.attached ? root.children.attached : [];

    // Root label
    const rootEl = document.createElement('div');
    rootEl.className = 'mm-root';
    rootEl.innerHTML = `<div class="mm-root-label">🧠 ${escapeHTML(root.title)}</div>`;
    container.appendChild(rootEl);

    // Main branches grid
    const grid = document.createElement('div');
    grid.className = 'mm-main-branches';

    mainBranches.forEach(branch => {
      const branchClass = getBranchClass(branch.title);
      const style = getBranchStyle(branch.title);
      const branchEl = document.createElement('div');
      branchEl.className = `mm-branch branch-${branchClass}`;

      const hasSub = branch.children && branch.children.attached && branch.children.attached.length > 0;

      // Header
      const header = document.createElement('div');
      header.className = 'mm-branch-header';
      header.style.background = style.bg;
      header.style.color = style.color;
      header.innerHTML = `<span>${escapeHTML(branch.title)}</span><span class="mm-toggle">▼</span>`;

      // Content
      const content = document.createElement('div');
      content.className = 'mm-branch-content';

      if (hasSub) {
        buildChildren(content, branch.children, 1);
      } else {
        content.innerHTML = '<div class="mm-item" style="color:#999;font-style:italic;padding:8px 0;">No details yet</div>';
      }

      // Toggle collapse
      header.addEventListener('click', () => {
        header.classList.toggle('collapsed');
        content.classList.toggle('collapsed');
      });

      branchEl.appendChild(header);
      branchEl.appendChild(content);
      grid.appendChild(branchEl);
    });

    container.appendChild(grid);

    // Expand/Collapse all buttons
    const controls = document.createElement('div');
    controls.className = 'mindmap-controls';
    controls.style.marginTop = '16px';
    controls.style.display = 'flex';
    controls.style.gap = '8px';
    controls.style.justifyContent = 'center';

    const expandBtn = document.createElement('button');
    expandBtn.className = 'btn btn-banana btn-small';
    expandBtn.textContent = '🔽 Expand All';
    expandBtn.addEventListener('click', () => {
      container.querySelectorAll('.mm-branch-content, .mm-sub-items').forEach(el => el.classList.remove('collapsed'));
      container.querySelectorAll('.mm-branch-header').forEach(el => el.classList.remove('collapsed'));
    });

    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'btn btn-outline btn-small';
    collapseBtn.textContent = '🔼 Collapse All';
    collapseBtn.addEventListener('click', () => {
      container.querySelectorAll('.mm-sub-items').forEach(el => el.classList.add('collapsed'));
    });

    controls.appendChild(expandBtn);
    controls.appendChild(collapseBtn);
    container.insertBefore(controls, container.firstChild);
  }

  // Export to window
  window.MindmapRenderer = {
    render: renderMindmap
  };
})();
