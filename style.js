// ==========================================
// MAYANK KATARIA — PORTFOLIO INTERACTIONS
// Premium interactions + smooth animations
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 3D PROFILE CARD
    // ==========================================

    const profileCard = document.querySelector(".profile-card");

    if (profileCard && window.matchMedia("(pointer: fine)").matches) {

        let animationFrame;

        profileCard.addEventListener("mousemove", (event) => {

            cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(() => {

                const rect = profileCard.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -7;

                const rotateY =
                    ((x - centerX) / centerX) * 7;

                profileCard.style.animation = "none";

                profileCard.style.transform =
                    `perspective(1200px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)
                     scale(1.015)`;
            });
        });

        profileCard.addEventListener("mouseleave", () => {

            cancelAnimationFrame(animationFrame);

            profileCard.style.transform = "";

            profileCard.style.animation =
                "cardFloat 6s ease-in-out infinite, cardGlow 5s ease-in-out infinite alternate";
        });
    }


    // ==========================================
    // PROJECT CARD 3D EFFECT
    // ==========================================

    const projectCard = document.querySelector(".project-card");

    if (projectCard && window.matchMedia("(pointer: fine)").matches) {

        let animationFrame;

        projectCard.addEventListener("mousemove", (event) => {

            cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(() => {

                const rect = projectCard.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -1.5;

                const rotateY =
                    ((x - centerX) / centerX) * 1.5;

                projectCard.style.transform =
                    `perspective(1400px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;
            });
        });

        projectCard.addEventListener("mouseleave", () => {

            cancelAnimationFrame(animationFrame);

            projectCard.style.transform = "";
        });
    }


    // ==========================================
    // CURSOR GLOW
    // ==========================================

    const supportsHover =
        window.matchMedia("(pointer: fine)").matches;

    if (supportsHover) {

        const cursorGlow = document.createElement("div");

        cursorGlow.className = "cursor-glow";

        document.body.appendChild(cursorGlow);

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        function animateCursor() {

            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;

            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }


    // ==========================================
    // SCROLL REVEAL
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-grid, " +
        ".skill-card, " +
        ".project-card, " +
        ".contact-content"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "reveal-visible"
            );
        });
    }


    // ==========================================
    // SKILL CARD 3D EFFECT
    // ==========================================

    const skillCards =
        document.querySelectorAll(".skill-card");

    if (window.matchMedia("(pointer: fine)").matches) {

        skillCards.forEach((card) => {

            let animationFrame;

            card.addEventListener("mousemove", (event) => {

                cancelAnimationFrame(animationFrame);

                animationFrame =
                    requestAnimationFrame(() => {

                        const rect =
                            card.getBoundingClientRect();

                        const x =
                            event.clientX - rect.left;

                        const y =
                            event.clientY - rect.top;

                        const centerX =
                            rect.width / 2;

                        const centerY =
                            rect.height / 2;

                        const rotateX =
                            ((y - centerY) / centerY) * -4;

                        const rotateY =
                            ((x - centerX) / centerX) * 4;

                        card.style.transform =
                            `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-8px)`;
                    });
            });

            card.addEventListener("mouseleave", () => {

                cancelAnimationFrame(animationFrame);

                card.style.transform = "";
            });
        });
    }


    // ==========================================
    // SMOOTH ANCHOR NAVIGATION
    // ==========================================

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    // ==========================================
    // ACTIVE NAVIGATION LINK
    // ==========================================

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            const currentId =
                                entry.target.getAttribute("id");

                            navLinks.forEach((link) => {

                                link.classList.remove(
                                    "active"
                                );

                                if (
                                    link.getAttribute("href") ===
                                    `#${currentId}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );
                                }
                            });
                        }
                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",
                    threshold: 0
                }
            );

        sections.forEach((section) => {

            sectionObserver.observe(section);
        });
    }


    // ==========================================
    // PROJECT IFRAME LOAD EFFECT
    // ==========================================

    const projectIframe =
        document.querySelector(".project-iframe");

    if (projectIframe) {

        projectIframe.addEventListener("load", () => {

            projectIframe.classList.add(
                "iframe-loaded"
            );
        });
    }


    // ==========================================
    // YEAR AUTO UPDATE
    // ==========================================

    const footerText =
        document.querySelector("footer p");

    if (footerText) {

        const currentYear =
            new Date().getFullYear();

        footerText.innerHTML =
            footerText.innerHTML.replace(
                /©\s*\d{4}/,
                `© ${currentYear}`
            );
    }


    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================

    console.log(
        "%cWelcome to Mayank's Portfolio 🚀",
        "font-size:16px;font-weight:bold;color:#38bdf8;"
    );

});