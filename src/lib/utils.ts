export function formatCitation(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toLocaleString();
}

export function formatAPA(paper: {
  authors: string;
  year: string;
  title: string;
  journal?: string;
  doi: string;
}): string {
  const journal = paper.journal || 'Academic Journal';
  return `${paper.authors} (${paper.year}). "${paper.title}." ${journal}. DOI: ${paper.doi}`;
}

export function formatBibTeX(paper: {
  authors: string;
  year: string;
  title: string;
  journal?: string;
  doi: string;
}): string {
  const key = `${paper.authors.split(' ')[0].toLowerCase()}${paper.year}`;
  const journal = paper.journal || 'Scholarly Workspace';
  return `@article{${key},
  title={${paper.title}},
  author={${paper.authors}},
  journal={${journal}},
  year={${paper.year}},
  doi={${paper.doi}}
}`;
}

export function generateDOI(): string {
  return `10.48550/arXiv.2607.${Math.floor(1000 + Math.random() * 9000)}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  return Promise.resolve();
}

export function announceToScreenReader(message: string): void {
  const el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.setAttribute('aria-atomic', 'true');
  el.className = 'sr-only';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => {
    document.body.removeChild(el);
  }, 1000);
}
