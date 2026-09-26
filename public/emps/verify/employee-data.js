/**
 * TRIMITHA — Employee Verification Data
 * ============================================================
 * This file is the single place where employee-verification
 * configuration and registry data live, kept separate from
 * /emps/verify/index.html so it can be maintained (and later
 * replaced) independently of the page's markup and logic.
 *
 * IMPORTANT — THIS IS NOT A SECURE BACKEND
 * ------------------------------------------------------------
 * Anything in this file is downloaded and readable by every
 * visitor's browser, exactly like the rest of the page. Treat
 * everything here as PUBLIC information:
 *   - employee id, name, designation, status, photo URL, and
 *     the employee's own public profile page.
 *
 * NEVER add to this file:
 *   - database credentials, API keys, admin tokens
 *   - internal-only notes, salary/HR data, or anything not meant
 *     for a stranger who scans an ID card
 *
 * SWAPPING THIS FOR A REAL BACKEND
 * ------------------------------------------------------------
 * When a verification API exists, you do not need to touch this
 * file's shape or index.html's rendering code. Just:
 *   1. Set VERIFY_CONFIG.registryEndpoint below (e.g.
 *      '/api/employee/verify/').
 *   2. In index.html, update the body of verifyEmployeeId() to
 *      fetch(VERIFY_CONFIG.registryEndpoint + encodeURIComponent(id))
 *      and return the same { verified, status, employee } shape
 *      this file's data currently produces.
 *   3. Delete the EMPLOYEE_REGISTRY array below (or leave it as
 *      an offline fallback, if you prefer).
 * ============================================================
 */

/* Global verification settings. Centralized here so the employee-ID
   format only ever needs to change in one place.

   ID SHAPE: <first initial><last initial>-<8 digits>
   e.g. an employee named "Ravi Kumar" gets a prefix of "RK", so a
   card might read "RK-08010700". The two-letter prefix is NOT fixed
   company-wide — it varies per employee based on their own name — so
   the pattern below only checks the general shape (two letters, a
   dash, eight digits). It does not and cannot check that a given
   prefix actually matches the name it's assigned to; that's exactly
   what the registry lookup in verifyEmployeeId() is for, so a
   correctly-shaped but unissued ID (e.g. "ZZ-00000000") still fails
   verification as "not_found". */
const VERIFY_CONFIG = {
    idPattern: /^[A-Z]{2}-\d{8}$/,   // <initials>-XXXXXXXX
    registryEndpoint: null           // e.g. '/api/employee/verify/' once a backend exists
};

/* Helper for whoever maintains this file: derive the expected prefix
   for a new employee from their name when issuing a new ID card. Not
   used by the verification flow itself — just a convenience so new
   entries stay consistent with existing ones. */
function getEmployeeIdPrefix(firstName, lastName) {
    const firstInitial = (firstName || '').trim().charAt(0).toUpperCase();
    const lastInitial = (lastName || '').trim().charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
}

/* Temporary client-side employee registry.
   Add one object per issued ID card. Keep `profile` pointing at the
   employee's existing page under /emps/ — never let the verification
   page construct that path itself from user input. */
const EMPLOYEE_REGISTRY = [
    {
        id: 'PT-08010700',            // "Polanki Thrinath" -> P + T
        name: 'Polanki Thrinath',
        designation: 'CEO/Founder',
        photo: '/emps/imgs/polanki-thrinath-founder-trimitha-2.png',                  // e.g. '/emps/images/ravi-kumar-1x1.png'
        profile: '/founder/',
        status: 'active'              // 'active' | 'inactive' | 'revoked'
    },
    {
        id: 'CJ-26057900',            // "Janaki Chedulla" -> J + C
        name: 'Chedulla Janaki',
        designation: 'Chief Financial Officer',
        photo: '/emps/imgs/janaki-chedulla-cfo-trimitha-1.png',
        profile: '/emps/cfo.html',
        status: 'active'
    },
    {
        id: 'PD-19110800',            // "Arjun Sharma" -> A + S
        name: 'Polanki Dhanusha',
        designation: 'Chief Information Officer',
        photo: '/emps/imgs/polanki-dhanusha-cio-trimitha-1.png',
        profile: '/emps/cio.html',
        status: 'active'
    },
    {
        id: 'PB-25052300',            // "Arjun Sharma" -> A + S
        name: 'Polanki Bala Thripura',
        designation: 'COO/President',
        photo: '/emps/imgs/polanki-bala-thripura-coo-trimitha-1.png',
        profile: '/emps/coo.html',
        status: 'active'
    }
];
