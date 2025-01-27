#include <stdio.h>
#include <string.h>

void encryptDocument(const char *inputFile, const char *outputFile, const char *password) {
    FILE *in = fopen(inputFile, "rb");
    FILE *out = fopen(outputFile, "wb");

    if (in == NULL || out == NULL) {
        printf("Error opening file.\n");
        return;
    }

    size_t passLen = strlen(password);
    char buffer[1024];
    size_t bytesRead;

    while ((bytesRead = fread(buffer, 1, sizeof(buffer), in)) > 0) {
        for (size_t i = 0; i < bytesRead; i++) {
            buffer[i] ^= password[i % passLen]; // XOR encryption
        }
        fwrite(buffer, 1, bytesRead, out);
    }

    fclose(in);
    fclose(out);

    printf("Document encrypted successfully.\n");
}

int main() {
    const char *inputFile = "document.txt";
    const char *outputFile = "secure_document.txt";
    const char *password = "securepassword";

    encryptDocument(inputFile, outputFile, password);
    return 0;
}
