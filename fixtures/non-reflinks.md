
```
Usage: markdown-toc [--json] [-i] <input>

  input:  The markdown file to parse for table of contents,
          or "-" to read from stdin.

  --json: Print the TOC in json format

  -i:     Edit the <input> file directly, injecting the TOC at <!!-- toc -->
          (Without this flag, the default is to print the TOC to stdout.)
```