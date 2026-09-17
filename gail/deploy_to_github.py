import os
import sys
import json
import base64
import urllib.request
import urllib.error

# Files to deploy
FILES_TO_DEPLOY = [
    'index.html',
    'manifest.json',
    'sw.js',
    'css/style.css',
    'js/audio.js',
    'js/game-data.js',
    'js/game.js',
    'js/social-card.js',
    'js/pwa.js',
    'assets/crop2-corridor.jpg',
    'assets/dark-3d-india-map.jpg',
    'assets/wah-kya-energy-hai-transparent.png',
    'assets/WhatsApp Image 2026-09-15 at 08.48.18.jpeg',
    'assets/WhatsApp Image 2026-09-15 at 16.45.22.jpeg',
    'assets/WhatsApp Image 2026-09-15 at 20.21.52.jpeg',
    'assets/gail-map-legend-complete.png',
    'assets/icon-192.png',
    'assets/icon-512.png',
    '.nojekyll'
]

def api_request(url, token, method='GET', data=None):
    headers = {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'GAIL-Energy-Connect-Deployer',
        'X-GitHub-Api-Version': '2022-11-28'
    }
    encoded_data = None
    if data is not None:
        encoded_data = json.dumps(data).encode('utf-8')
        headers['Content-Type'] = 'application/json'

    req = urllib.request.Request(url, data=encoded_data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode('utf-8')
            return json.loads(res_body) if res_body else {}
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode('utf-8')
        try:
            err_json = json.loads(err_msg)
            return {'error': True, 'status': e.code, 'message': err_json.get('message', err_msg)}
        except Exception:
            return {'error': True, 'status': e.code, 'message': err_msg}

def deploy(token, repo_name="gail-energy-connect"):
    print(f"[*] Authenticating with GitHub API...")
    user_info = api_request("https://api.github.com/user", token)
    if user_info.get('error'):
        print(f"[!] Authentication failed: {user_info.get('message')} (HTTP {user_info.get('status')})")
        return False

    username = user_info.get('login')
    print(f"[+] Authenticated as: {username}")

    # 1. Check or create repository
    print(f"[*] Checking repository '{username}/{repo_name}'...")
    repo_info = api_request(f"https://api.github.com/repos/{username}/{repo_name}", token)

    if repo_info.get('error') and repo_info.get('status') == 404:
        print(f"[*] Repository does not exist. Creating public repository '{repo_name}'...")
        create_payload = {
            "name": repo_name,
            "description": "GAIL Energy Connect - Jodo Pipeline. Jagao Shehar. (#WahKyaEnergyHai)",
            "homepage": f"https://{username}.github.io/{repo_name}/",
            "private": False,
            "auto_init": True
        }
        repo_info = api_request("https://api.github.com/user/repos", token, method="POST", data=create_payload)
        if repo_info.get('error'):
            print(f"[!] Failed to create repository: {repo_info.get('message')}")
            return False
        print(f"[+] Repository created: https://github.com/{username}/{repo_name}")
    elif not repo_info.get('error'):
        print(f"[+] Repository found: https://github.com/{username}/{repo_name}")
    else:
        print(f"[!] Error accessing repository: {repo_info.get('message')}")
        return False

    # 2. Upload blobs for all files
    tree_items = []
    print(f"[*] Preparing {len(FILES_TO_DEPLOY)} project files...")

    for rel_path in FILES_TO_DEPLOY:
        norm_path = rel_path.replace('/', os.sep)
        if not os.path.exists(norm_path):
            print(f"  [-] Skipping missing file: {rel_path}")
            continue

        with open(norm_path, 'rb') as f:
            content_bytes = f.read()

        b64_content = base64.b64encode(content_bytes).decode('utf-8')
        blob_payload = {
            "content": b64_content,
            "encoding": "base64"
        }
        blob_res = api_request(f"https://api.github.com/repos/{username}/{repo_name}/git/blobs", token, method="POST", data=blob_payload)
        if blob_res.get('error'):
            print(f"  [!] Failed to upload blob for {rel_path}: {blob_res.get('message')}")
            return False

        tree_items.append({
            "path": rel_path.replace('\\', '/'),
            "mode": "100644",
            "type": "blob",
            "sha": blob_res["sha"]
        })
        print(f"  [+] Uploaded {rel_path} ({len(content_bytes)} bytes)")

    # 3. Create tree
    print(f"[*] Creating Git tree with {len(tree_items)} items...")
    tree_payload = {"tree": tree_items}
    tree_res = api_request(f"https://api.github.com/repos/{username}/{repo_name}/git/trees", token, method="POST", data=tree_payload)
    if tree_res.get('error'):
        print(f"[!] Failed to create git tree: {tree_res.get('message')}")
        return False
    tree_sha = tree_res["sha"]

    # 4. Find parent commit if any
    ref_info = api_request(f"https://api.github.com/repos/{username}/{repo_name}/git/refs/heads/main", token)
    parent_commits = []
    if not ref_info.get('error') and 'object' in ref_info:
        parent_commits.append(ref_info['object']['sha'])

    # 5. Create commit
    commit_payload = {
        "message": "Deploy GAIL Energy Connect with 6 cities, 3D corridor map, and heritage landmarks ⚡",
        "tree": tree_sha,
        "parents": parent_commits
    }
    commit_res = api_request(f"https://api.github.com/repos/{username}/{repo_name}/git/commits", token, method="POST", data=commit_payload)
    if commit_res.get('error'):
        print(f"[!] Failed to create commit: {commit_res.get('message')}")
        return False
    commit_sha = commit_res["sha"]

    # 6. Update or create ref
    if parent_commits:
        ref_update = api_request(f"https://api.github.com/repos/{username}/{repo_name}/git/refs/heads/main", token, method="PATCH", data={"sha": commit_sha, "force": True})
    else:
        ref_update = api_request(f"https://api.github.com/repos/{username}/{repo_name}/git/refs", token, method="POST", data={"ref": "refs/heads/main", "sha": commit_sha})

    if ref_update.get('error'):
        print(f"[!] Failed to update branch ref: {ref_update.get('message')}")
        return False

    print(f"[+] Successfully pushed commit {commit_sha[:7]} to 'main' branch!")

    # 7. Enable GitHub Pages
    print(f"[*] Configuring GitHub Pages for branch 'main'...")
    pages_payload = {
        "source": {
            "branch": "main",
            "path": "/"
        }
    }
    pages_res = api_request(f"https://api.github.com/repos/{username}/{repo_name}/pages", token, method="POST", data=pages_payload)
    
    # If pages is already enabled or created
    pages_url = f"https://{username.lower()}.github.io/{repo_name}/"
    if pages_res.get('error') and 'already' in str(pages_res.get('message', '')).lower():
        print(f"[+] GitHub Pages is already enabled!")
    elif not pages_res.get('error'):
        pages_url = pages_res.get('html_url', pages_url)
        print(f"[+] GitHub Pages successfully enabled!")
    else:
        print(f"[*] Pages response: {pages_res.get('message')}")

    print("\n" + "="*70)
    print(f"🎉 DEPLOYMENT COMPLETE!")
    print(f"📦 Repository: https://github.com/{username}/{repo_name}")
    print(f"🌐 Live Cloud Website: {pages_url}")
    print("="*70 + "\n")
    return True

if __name__ == '__main__':
    token = os.environ.get('GITHUB_TOKEN')
    repo = sys.argv[1] if len(sys.argv) > 1 else "gail-energy-connect"
    if len(sys.argv) > 2:
        token = sys.argv[2]

    if not token:
        print("[!] No GitHub Token provided. Please pass as argument or set GITHUB_TOKEN environment variable.")
        sys.exit(1)

    success = deploy(token, repo)
    sys.exit(0 if success else 1)
