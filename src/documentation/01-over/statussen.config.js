module.exports = {
  context: {
    "statuses": [
      {
          label: "Ready",
          description: "Component requirements en design afgestemd met stakeholders en ontwikkelteam.",
          color: "#e86e01"
      },
      {
          label: "In progress",
          description: "Uitwerking design en bouwen en testen van component volgens requirements.",
          color: "#edbf07"
      },
      {
          label: "Review",
          description: "-",
          color: "#1261a3"
      },
      {
          label: "Done",
          description: "Voldoet aan DoD, geaccepteerd door PO en checkin in design system.",
          color: "#227b3c"
      },
      {
          label: "Integratie test",
          description: "Functioneert het component geïntegreerd in een feature.",
          color: "#9a6f1e"
      },
      {
          label: "Live",
          description: "Component live geintegreerd in een feature.",
          color: "#227b3c"
      }
    ]
  }
};
