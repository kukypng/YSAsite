// Função para verificar se um texto de erro específico está presente na página
function verificarErro(textoErro) {
  // Obtém todos os elementos de texto da página
  const elementosTexto = document.querySelectorAll('body *');

  // Itera sobre os elementos de texto e verifica se o texto de erro está presente
  for (let i = 0; i < elementosTexto.length; i++) {
    if (elementosTexto[i].textContent.includes(textoErro)) {
      return true; // Texto de erro encontrado
    }
  }

  return false; // Texto de erro não encontrado
}

// Texto de erro que você deseja detectar
const textoErro = "FORBIDDEN: Reading file failed."; // Substitua pelo texto de erro real do seu site

// Verifica se o texto de erro está presente na página quando o DOM é carregado
document.addEventListener('DOMContentLoaded', function() {
  if (verificarErro(textoErro)) {
    // Redireciona o usuário para a página 403.html
    window.location.href = "403.html";
  }
});
