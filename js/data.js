// ===== WEBSITE DATA =====

const EC2GData = {
  // Site configuration
  site: {
    name: "EC2G Group",
    institution: "Universidad Técnica Federico Santa María",
    department: "Department of Industrial Engineering",
    locations: ["Valparaíso", "Santiago"],
    country: "Chile"
  },

  // Navigation
  navigation: [
    { href: "index.html", text: "Home" },
    { href: "news.html", text: "News" },
    { href: "staff.html", text: "Staff" },
    { href: "videos.html", text: "Videos" },
    { href: "network.html", text: "Network" }
  ],

  // Research areas
  researchAreas: [
    "Combustion in microgravity",
    "Biomass energy conversion", 
    "Fire safety",
    "Wildfires",
    "Optical experimental methods",
    "Solar potential assessment"
  ],

  // News items
  news: [
    {
      id: "mcs13",
      title: "13th Mediterranean Combustion Symposium",
      date: "2024-06-09",
      image: "img/MCS.png",
      content: "The EC2G group participated in the 13th Mediterranean Combustion Symposium, held in Corfu, Greece, from June 9–14, 2024. Our team presented recent research and engaged with the international combustion community. Congratulations to all members who contributed to this successful participation!"
    },
    {
      id: "new-project",
      title: "New Project Awarded",
      date: "2024-08-01",
      content: "EC2G has been granted funding for a new research project on Biomass Energy Conversion starting August 2024. Stay tuned for updates on our progress and findings!"
    },
    {
      id: "seminar",
      title: "Upcoming Seminar",
      date: "2024-09-12",
      content: "Join us for a seminar on Fire Safety in Industrial Environments on September 12, 2024, at the Valparaíso campus. All are welcome!"
    },
    {
      id: "paper-published",
      title: "New Research Paper Published",
      date: "2024-12-15",
      image: "img/pecs.png",
      content: "Dr. Felipe Escudero, Dr. José Morán and Dr. Andrés Fuentes have collaborated in the publication of a paper in the prestigious journal Progress in Energy and Combustion Science. The paper is titled 'Progress in multi-scale modeling of soot particle aggregation in laminar sooting flames' and can be found <a href=\"https://doi.org/10.1016/j.pecs.2025.101234\" target=\"_blank\">here</a>"
    }
  ],

  // Events
  events: [
    {
      id: "apciss-2025",
      title: "Asia-Pacific Combustion Institute Summer School",
      date: "2025-11-02T17:00:00",
      description: "The main goal of the 3rd Asia-Pacific Combustion Institute Summer School is to introduce the combustion and fire safety community to fundamental combustion problems, focusing on studies of diffusion flames and their connection to large-scale fires. This year's school will emphasize the link between combustion theory and practical applications in both industrial settings and real fire scenarios, contributing to create and strengthen the links between different academic institutions and research groups focused in the Asia Pacific and South American areas.",
      details: "Scholarships will be awarded only to students, on the basis of merit. Applications to be considered for scholarships must be submitted before September 26, 2025. Results of the application process will be announced on October 03, 2025.",
      website: "https://www.apciss.cl"
    }
  ],

  // Staff data
  staff: {
    academic: [
      {
        id: "andres-fuentes",
        name: "Andrés Fuentes",
        degree: "PhD",
        title: "Professor",
        avatar: "staff/avatars/Andres_Fuentes-150x150.png",
        email: "andres.fuentes@usm.cl",
        orcid: "0000-0002-5037-0961",
        researchInterests: [
          "Combustion and Energy Conversion",
          "Computational Fluid Dynamics", 
          "Experimental Combustion",
          "Renewable Energy Systems"
        ]
      },
      {
        id: "rodrigo-demarco",
        name: "Rodrigo Demarco",
        degree: "PhD",
        title: "Associate Professor",
        avatar: "images/rodrigo_demarco.png",
        email: "rodrigo.demarco@usm.cl"
      },
      {
        id: "felipe-escudero",
        name: "Felipe Escudero",
        degree: "PhD",
        title: "Assistant Professor",
        avatar: "images/felipe_escudero.png",
        email: "felipe.escudero@usm.cl"
      },
      {
        id: "gonzalo-severino",
        name: "Gonzalo Severino",
        degree: "PhD",
        title: "Assistant Professor",
        avatar: "images/gonzalo_severino.png",
        email: "gonzalo.severino@usm.cl"
      },
      {
        id: "gonzalo-olivares",
        name: "Gonzalo Olivares",
        degree: "MSc",
        title: "Research Engineer",
        avatar: "images/gonzalo_olivares.png",
        email: "gonzalo.olivares@usm.cl"
      }
    ],
    students: [
      {
        id: "ignacio-verdugo",
        name: "Ignacio Verdugo",
        degree: "MSc",
        title: "PhD Student",
        avatar: "images/ignacio_verdugo.png",
        email: "ignacio.verdugo@usm.cl"
      },
      {
        id: "nicolas-gutierrez",
        name: "Nicolás Gutiérrez",
        degree: "MSc",
        title: "PhD Student",
        avatar: "images/nicolas_gutierrez.png",
        email: "nicolas.gutierrez@usm.cl"
      },
      {
        id: "felipe-alarcon",
        name: "Felipe Alarcón",
        degree: "",
        title: "MSc Student",
        avatar: "images/felipe_alarcon.png",
        email: "felipe.alarcon@usm.cl"
      },
      {
        id: "constanza-lopez",
        name: "Constanza López",
        degree: "",
        title: "MSc Student",
        avatar: "images/constanza_lopez.png",
        email: "constanza.lopez@usm.cl"
      }
    ],
    collaborators: [
      {
        id: "juan-jose-cruz",
        name: "Juan José Cruz",
        degree: "PhD",
        title: "Assistant Professor",
        avatar: "images/juan_jose_cruz.png",
        institution: "Collaborating Institution"
      },
      {
        id: "pedro-reszka",
        name: "Pedro Reszka",
        degree: "PhD",
        title: "Associate Professor",
        avatar: "images/pedro_reszka.png",
        institution: "Collaborating Institution"
      },
      {
        id: "maria-thomsen",
        name: "María Thomsen",
        degree: "PhD",
        title: "Assistant Professor",
        avatar: "images/maria_thomsen.png",
        institution: "Collaborating Institution"
      },
      {
        id: "jose-moran",
        name: "José Morán",
        degree: "PhD",
        title: "Assistant Professor",
        avatar: "images/jose_moran.png",
        institution: "Collaborating Institution"
      }
    ]
  },

  // Videos
  videos: [
    {
      id: "combustion-lab-tour",
      title: "Combustion Lab Tour",
      description: "A comprehensive tour of our combustion laboratory facilities",
      youtubeId: "your_video_id",
      thumbnail: "img/video-thumbnail-1.jpg"
    }
  ],

  // Network/Collaborations
  network: [
    {
      name: "Collaborator 1",
      institution: "Institution Name",
      description: "Description of collaboration"
    },
    {
      name: "Collaborator 2", 
      institution: "Institution Name",
      description: "Description of collaboration"
    }
  ]
};

// Export for use in other scripts
window.EC2GData = EC2GData; 