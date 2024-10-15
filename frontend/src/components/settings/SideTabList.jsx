import React from 'react';

const tabs = [
  { href: "#account", label: "Account", isActive: true },
  { href: "#password", label: "Password" },
  { href: "#privacy", label: "Privacy and safety" },
  { href: "#email", label: "Email notifications" },
  { href: "#web", label: "Web notifications" },
  { href: "#widgets", label: "Widgets" },
  { href: "#data", label: "Your data" },
  { href: "#delete", label: "Delete account" },
];

export default function SideTabList() {
  return (
    <div className="list-group list-group-flush" role="tablist">
      {tabs.map((tab) => (
        <a
          key={tab.href}
          className={`list-group-item list-group-item-action ${tab.isActive ? 'active' : ''}`}
          data-toggle="list"
          href={tab.href}
          role="tab"
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
}
