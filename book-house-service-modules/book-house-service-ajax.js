class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            const data = response.ok ? await response.json() : null;
            return { data, status: response.status };
        } catch (error) {
            console.error('Fetch GET error:', error);
            return { data: null, status: 500 };
        }
    }

    async post(url, payload) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = response.ok ? await response.json() : null;
            return { data, status: response.status };
        } catch (error) {
            console.error('Fetch POST error:', error);
            return { data: null, status: 500 };
        }
    }

    async patch(url, payload) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = response.ok ? await response.json() : null;
            return { data, status: response.status };
        } catch (error) {
            console.error('Fetch PATCH error:', error);
            return { data: null, status: 500 };
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            // DELETE часто возвращает 204 No Content (без тела ответа)
            const data = response.status !== 204 ? await response.json().catch(() => null) : null;
            return { data, status: response.status };
        } catch (error) {
            console.error('Fetch DELETE error:', error);
            return { data: null, status: 500 };
        }
    }
}

export const ajax = new Ajax();
