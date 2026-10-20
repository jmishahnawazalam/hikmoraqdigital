

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");
const submitButton = contactForm.querySelector('button[type="submit"]');

const businessEmail = "hikmoraqdigital@gmail.com";

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);

    const enquiry = {
        name: data.get("name").trim(),
        email: data.get("email").trim(),
        service: data.get("service"),
        message: data.get("message").trim(),
        _replyto: data.get("email").trim(),
        _subject: `HIKMORAQ Enquiry - ${data.get("service")}`
    };

    submitButton.disabled = true;
    formNote.textContent = "Sending your enquiry...";

    try {
        const response = await fetch(
            `https://formsubmit.co/ajax/${encodeURIComponent(businessEmail)}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(enquiry)
            }
        );

        const result = await response.json();

        if (!response.ok || result.success !== true &&
            result.success !== "true") {
            throw new Error(result.message || "Email submission failed.");
        }

        formNote.textContent =
            "Thank you! Your enquiry was submitted successfully.";

        contactForm.reset();

    } catch (error) {
        console.error("HIKMORAQ enquiry error:", error);

        formNote.textContent =
            "We couldn't submit your enquiry. Please try again or email hikmoraqdigital@gmail.com.";

    } finally {
        submitButton.disabled = false;
    }
});
