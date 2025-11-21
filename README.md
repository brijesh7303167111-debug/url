- Shortened URLs in the table are clickable and navigate to the original URL.

### Clipboard Support
- Users can copy the short URL to the clipboard using a "Copy" button.  
- A temporary confirmation message shows "Copied!" when clicked.

### Responsive Design
- The application is fully responsive and works on both desktop and mobile devices.  
- Mobile view includes compact buttons with icons for actions like copy and delete.

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  

---

## Endpoints

| Method | Endpoint        | Description                          |
|--------|----------------|--------------------------------------|
| POST   | `/create`       | Create a new short URL               |
| GET    | `/links`        | List all URLs                        |
| GET    | `/code/:code`   | Get details of a specific code       |
| DELETE | `/del/:code`    | Delete a URL by its short code       |
| GET    | `/:code`        | Redirect to the original URL         |

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
